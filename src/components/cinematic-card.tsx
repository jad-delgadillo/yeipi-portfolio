"use client";

import Image from "next/image";
import Link from "next/link";
import type { Ref } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type CinematicCardProps = {
  title: string;
  description: string;
  label: string;
  posterSrc: string;
  videoSrc: string;
  active?: boolean;
  href?: string;
  className?: string;
};

const ACTIVE_CARD_EVENT = "cinematic-card:activate";
const VISIBILITY_THRESHOLD = 0.65;
let activeCardId: string | null = null;
let activeCardElement: HTMLElement | null = null;

function getVisibleRatio(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const visibleWidth =
    Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
  const visibleHeight =
    Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
  const visibleArea = visibleWidth * visibleHeight;
  const area = rect.width * rect.height;

  return area > 0 ? visibleArea / area : 0;
}

export function CinematicCard({
  title,
  description,
  label,
  posterSrc,
  videoSrc,
  active,
  href,
  className,
}: CinematicCardProps) {
  const cardId = useId();
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInPrimaryViewRef = useRef(false);
  const pointerFocusedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [isLocallyActive, setIsLocallyActive] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasLoadedVideo, setHasLoadedVideo] = useState(false);
  const isControlled = active !== undefined;
  const isActive = isControlled ? Boolean(active) : isLocallyActive;

  const pauseVideo = useCallback((resetPlayback = true) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.pause();

    if (resetPlayback) {
      try {
        video.currentTime = 0;
      } catch {
        // Some browsers can reject currentTime changes while metadata is absent.
      }
    }
  }, []);

  const requestActivation = useCallback((force = false) => {
    if (reducedMotionRef.current) {
      return;
    }

    if (
      !force &&
      activeCardId &&
      activeCardId !== cardId &&
      activeCardElement &&
      getVisibleRatio(activeCardElement) >= VISIBILITY_THRESHOLD
    ) {
      return;
    }

    activeCardId = cardId;
    activeCardElement = cardRef.current;
    window.dispatchEvent(
      new CustomEvent(ACTIVE_CARD_EVENT, { detail: { cardId } }),
    );
    setHasLoadedVideo(true);
    setIsLocallyActive(true);
  }, [cardId]);

  const deactivate = useCallback(() => {
    pointerFocusedRef.current = false;

    if (activeCardId === cardId) {
      activeCardId = null;
      activeCardElement = null;
    }

    setIsLocallyActive(false);
    pauseVideo();

    setIsVideoReady(false);
  }, [cardId, pauseVideo]);

  useEffect(() => {
    if (active) {
      setHasLoadedVideo(true);
      return;
    }

    if (!isLocallyActive) {
      setIsVideoReady(false);
      setHasLoadedVideo(false);
    }
  }, [active, isLocallyActive]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !isActive || !hasLoadedVideo) {
      if (!isActive) {
        pauseVideo();
      }
      return;
    }

    const playVideo = async () => {
      try {
        if (video.readyState === 0) {
          video.load();
        }

        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          setIsVideoReady(true);
        }

        await video.play();
        setIsVideoReady(true);
      } catch {
        pauseVideo(false);
      }
    };

    void playVideo();
  }, [hasLoadedVideo, isActive, pauseVideo]);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    reducedMotionRef.current = reducedMotionQuery.matches;

    if (reducedMotionQuery.matches) {
      pauseVideo();
      return;
    }

    const card = cardRef.current;

    if (!card) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isPrimaryVisible =
          entry.isIntersecting &&
          entry.intersectionRatio >= VISIBILITY_THRESHOLD;
        isInPrimaryViewRef.current = isPrimaryVisible;

        if (isPrimaryVisible && !isControlled) {
          requestActivation();
          return;
        }

        if (!isControlled && !pointerFocusedRef.current) {
          deactivate();
        }
      },
      {
        threshold: [0, 0.35, VISIBILITY_THRESHOLD, 0.85, 1],
      },
    );

    observer.observe(card);

    const handleActiveCard = (event: Event) => {
      const activeEventCardId = (event as CustomEvent<{ cardId: string }>)
        .detail?.cardId;

      if (!isControlled && activeEventCardId !== cardId) {
        deactivate();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        deactivate();
      } else if (!isControlled && isInPrimaryViewRef.current) {
        requestActivation();
      }
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;

      if (event.matches) {
        deactivate();
      } else if (!isControlled && isInPrimaryViewRef.current) {
        requestActivation();
      }
    };

    window.addEventListener(ACTIVE_CARD_EVENT, handleActiveCard);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      observer.disconnect();
      window.removeEventListener(ACTIVE_CARD_EVENT, handleActiveCard);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange,
      );
      pauseVideo();
    };
  }, [cardId, deactivate, isControlled, pauseVideo, requestActivation]);

  const handlePointerEnter = () => {
    if (isControlled) {
      return;
    }

    pointerFocusedRef.current = true;
    requestActivation(true);
  };

  const handlePointerLeave = () => {
    if (isControlled) {
      return;
    }

    pointerFocusedRef.current = false;

    if (!isInPrimaryViewRef.current) {
      deactivate();
    }
  };

  const handleFocus = () => {
    if (isControlled) {
      return;
    }

    pointerFocusedRef.current = true;
    requestActivation(true);
  };

  const handleBlur = () => {
    if (isControlled) {
      return;
    }

    pointerFocusedRef.current = false;

    if (!isInPrimaryViewRef.current) {
      deactivate();
    }
  };

  const cardClassName = className
    ? `cinematic-card ${className}`
    : "cinematic-card";
  const cardProps = {
    "aria-label": `${title}. ${label}. ${description}`,
    className: cardClassName,
    "data-active": isActive,
    "data-video-ready": isVideoReady,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onMouseEnter: handlePointerEnter,
    onMouseLeave: handlePointerLeave,
  };

  const content = (
    <>
      <div className="project-media project-poster">
        <Image
          alt=""
          className="project-poster-image"
          fill
          priority={false}
          sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
          src={posterSrc}
        />
      </div>
      <video
        aria-hidden="true"
        autoPlay
        className="project-media project-video"
        controls={false}
        loop
        muted
        onCanPlay={() => setIsVideoReady(true)}
        onLoadedData={() => setIsVideoReady(true)}
        playsInline
        preload="metadata"
        ref={videoRef}
        src={hasLoadedVideo || active ? videoSrc : undefined}
      />
      <div className="project-card-content">
        <h3>{title}</h3>
        <span>{description}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} ref={cardRef as Ref<HTMLAnchorElement>} {...cardProps}>
        {content}
      </Link>
    );
  }

  return (
    <article
      ref={cardRef as Ref<HTMLElement>}
      tabIndex={0}
      {...cardProps}
    >
      {content}
    </article>
  );
}
