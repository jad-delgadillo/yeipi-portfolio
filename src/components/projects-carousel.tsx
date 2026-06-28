"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { CinematicCard } from "@/components/cinematic-card";

type Project = {
  title: string;
  category: string;
  description: string;
  poster: string;
  video: string;
};

type ProjectsCarouselProps = {
  projects: Project[];
};

const AUTOPLAY_DURATION = 4200;

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const activeIndexRef = useRef(0);
  const frameRef = useRef(0);
  const gestureStartIndexRef = useRef(0);
  const isProgrammaticScrollRef = useRef(false);
  const progressFrameRef = useRef(0);
  const scrollAnimationFrameRef = useRef(0);
  const settleTimerRef = useRef(0);
  const startedAtRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const getCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [];

    return Array.from(track.querySelectorAll<HTMLElement>(".project-card"));
  }, []);

  const getNearestIndex = useCallback(() => {
    const track = trackRef.current;
    const cards = getCards();
    if (!track || !cards.length) return 0;

    const trackLeft = track.getBoundingClientRect().left;
    return cards.reduce((nearest, card, index) => {
      const currentDistance = Math.abs(card.getBoundingClientRect().left - trackLeft);
      const nearestDistance = Math.abs(cards[nearest].getBoundingClientRect().left - trackLeft);

      return currentDistance < nearestDistance ? index : nearest;
    }, 0);
  }, [getCards]);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    const cards = getCards();
    if (track && cards.length > 1 && !isProgrammaticScrollRef.current) {
      const targets = cards.map((card) => card.offsetLeft - track.offsetLeft);
      const currentLeft = track.scrollLeft;
      const previousIndex = targets.findLastIndex((target) => target <= currentLeft);
      const lowerIndex = Math.max(0, previousIndex);
      const upperIndex = Math.min(lowerIndex + 1, targets.length - 1);
      const lowerTarget = targets[lowerIndex] ?? 0;
      const upperTarget = targets[upperIndex] ?? lowerTarget;
      const span = Math.max(1, upperTarget - lowerTarget);
      const fractionalProgress = Math.min(
        Math.max((currentLeft - lowerTarget) / span, 0),
        1,
      );

      setScrollPosition(lowerIndex + fractionalProgress);
    }

    const nearestIndex = getNearestIndex();

    setActiveIndex((currentIndex) =>
      currentIndex === nearestIndex ? currentIndex : nearestIndex,
    );
  }, [getCards, getNearestIndex]);

  const scheduleActiveIndexUpdate = useCallback(() => {
    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToProject = useCallback((index: number) => {
    const track = trackRef.current;
    const cards = getCards();
    const target = cards[index];
    if (!track || !target) return;

    window.cancelAnimationFrame(scrollAnimationFrameRef.current);
    isProgrammaticScrollRef.current = true;

    const startLeft = track.scrollLeft;
    const targetLeft = target.offsetLeft - track.offsetLeft;
    const distance = targetLeft - startLeft;
    const startPosition = scrollPosition;
    const positionDistance = index - startPosition;
    const duration = Math.min(520, Math.max(280, Math.abs(distance) * 0.55));
    const startedAt = window.performance.now();

    activeIndexRef.current = index;
    setActiveIndex(index);

    const tick = (time: number) => {
      const elapsed = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);

      track.scrollLeft = startLeft + distance * eased;
      setScrollPosition(startPosition + positionDistance * eased);

      if (elapsed < 1) {
        scrollAnimationFrameRef.current = window.requestAnimationFrame(tick);
        return;
      }

      track.scrollLeft = targetLeft;
      setScrollPosition(index);
      isProgrammaticScrollRef.current = false;
      updateActiveIndex();
    };

    scrollAnimationFrameRef.current = window.requestAnimationFrame(tick);
  }, [getCards, scrollPosition, updateActiveIndex]);

  const resetProgress = useCallback(() => {
    startedAtRef.current = window.performance.now();
    setProgress(0);
  }, []);

  const goToProject = (index: number) => {
    setIsComplete(false);
    resetProgress();
    scrollToProject(index);
  };

  const handleTouchStart = () => {
    window.cancelAnimationFrame(scrollAnimationFrameRef.current);
    isProgrammaticScrollRef.current = false;
    gestureStartIndexRef.current = activeIndexRef.current;
  };

  const handleTouchEnd = () => {
    window.clearTimeout(settleTimerRef.current);

    settleTimerRef.current = window.setTimeout(() => {
      const nearestIndex = getNearestIndex();
      const startIndex = gestureStartIndexRef.current;
      const distance = nearestIndex - startIndex;

      if (Math.abs(distance) > 1) {
        scrollToProject(startIndex + Math.sign(distance));
        return;
      }

      updateActiveIndex();
    }, 180);
  };

  const handleControlClick = () => {
    if (isComplete) {
      goToProject(0);
      setIsPlaying(true);
      return;
    }

    setIsPlaying((current) => {
      const next = !current;
      if (next) {
        resetProgress();
      }

      return next;
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    scheduleActiveIndexUpdate();
    track.addEventListener("scroll", scheduleActiveIndexUpdate, { passive: true });
    window.addEventListener("resize", scheduleActiveIndexUpdate);

    const observer = new ResizeObserver(scheduleActiveIndexUpdate);
    observer.observe(track);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.cancelAnimationFrame(scrollAnimationFrameRef.current);
      isProgrammaticScrollRef.current = false;
      window.clearTimeout(settleTimerRef.current);
      observer.disconnect();
      track.removeEventListener("scroll", scheduleActiveIndexUpdate);
      window.removeEventListener("resize", scheduleActiveIndexUpdate);
    };
  }, [scheduleActiveIndexUpdate]);

  useEffect(() => {
    if (!isPlaying) {
      window.cancelAnimationFrame(progressFrameRef.current);
      return undefined;
    }

    startedAtRef.current = window.performance.now() - progress * AUTOPLAY_DURATION;

    const tick = (time: number) => {
      const nextProgress = Math.min((time - startedAtRef.current) / AUTOPLAY_DURATION, 1);
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        if (activeIndex >= projects.length - 1) {
          setIsPlaying(false);
          setIsComplete(true);
          return;
        }

        const nextIndex = activeIndex + 1;
        scrollToProject(nextIndex);
        startedAtRef.current = time;
        setProgress(0);
      }

      progressFrameRef.current = window.requestAnimationFrame(tick);
    };

    progressFrameRef.current = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(progressFrameRef.current);
  }, [activeIndex, isPlaying, progress, projects.length, scrollToProject]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;

    if (!isPlaying) {
      setProgress(0);
    }
  }, [activeIndex, isPlaying]);

  return (
    <div className="projects-carousel">
      <div
        className="project-grid"
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        ref={trackRef}
      >
        {projects.map((project, index) => (
          <CinematicCard
            active={index === activeIndex}
            className="project-card"
            description={project.description}
            key={project.title}
            label={project.category}
            posterSrc={project.poster}
            title={project.title}
            videoSrc={project.video}
          />
        ))}
      </div>

      <div className="project-carousel-controls" aria-label="Controles de historias">

        <div className="project-carousel-dots" role="tablist" aria-label="Seleccionar historia">
          {projects.map((project, index) => {
            const proximity = Math.max(0, 1 - Math.abs(scrollPosition - index));
            const dotWidth = 10 + proximity * 36;
            const dotProgress = activeIndex === index ? progress : 0;

            return (
              <button
                aria-label={`Ver ${project.title}`}
                aria-selected={activeIndex === index}
                className={activeIndex === index ? "is-active" : undefined}
                key={project.title}
                onClick={() => goToProject(index)}
                role="tab"
                style={
                  {
                    "--project-dot-width": `${dotWidth}px`,
                    "--project-progress": dotProgress,
                  } as CSSProperties & Record<string, number | string>
                }
                type="button"
              />
            );
          })}
        </div>



        <button
          aria-label={isComplete ? "Reiniciar historias" : isPlaying ? "Pausar historias" : "Reproducir historias"}
          className="project-carousel-next"
          onClick={handleControlClick}
          type="button"
        >
          {isComplete ? (
            <RotateCcw aria-hidden="true" size={25} strokeWidth={3} />
          ) : isPlaying ? (
            <Pause aria-hidden="true" fill="currentColor" size={23} strokeWidth={0} />
          ) : (
            <Play aria-hidden="true" fill="currentColor" size={25} strokeWidth={0} />
          )}
        </button>
      </div>
    </div>
  );
}
