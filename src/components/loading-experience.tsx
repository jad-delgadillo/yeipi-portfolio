"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  buildStyles,
  CircularProgressbar,
} from "react-circular-progressbar";

type LoaderStage = "intro" | "loading" | "exiting" | "done";

const returnToHomeKey = "yeipi:return-to-home";

const introSlides = [
  "¿Qué hace que un momento permanezca?",
  "No es solo lo que pasó.",
  "Es cómo se sintió.",
] as const;

function IntroProgressRing({
  duration,
  reduceMotion,
}: {
  duration: number;
  reduceMotion: boolean;
}) {
  const [progress, setProgress] = useState(reduceMotion ? 100 : 0);

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    const startTimer = window.setTimeout(() => setProgress(100), 60);
    return () => window.clearTimeout(startTimer);
  }, [reduceMotion]);

  return (
    <span className="intro-next-ring" aria-hidden="true">
      <CircularProgressbar
        strokeWidth={4}
        styles={buildStyles({
          pathColor: "rgba(255, 255, 255, 0.98)",
          pathTransition: reduceMotion
            ? "none"
            : `stroke-dashoffset ${duration}ms linear`,
          strokeLinecap: "round",
          trailColor: "rgba(255, 255, 255, 0.16)",
        })}
        value={progress}
      />
    </span>
  );
}

export function LoadingExperience() {
  const [stage, setStage] = useState<LoaderStage>("intro");
  const [slideIndex, setSlideIndex] = useState(0);
  const [progressReady, setProgressReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const isActive = stage !== "done";
  const slideDuration = reduceMotion ? 1200 : 2400;

  useLayoutEffect(() => {
    const navigationEntry = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    const isHistoryNavigation = navigationEntry?.type === "back_forward";
    const isReturningFromProject =
      sessionStorage.getItem(returnToHomeKey) === "true";

    if (isHistoryNavigation || isReturningFromProject) {
      sessionStorage.removeItem(returnToHomeKey);
      setStage("done");
      return undefined;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ left: 0, top: 0, behavior: "instant" });

    const resetFrame = window.requestAnimationFrame(() => {
      window.scrollTo({ left: 0, top: 0, behavior: "instant" });
    });

    return () => {
      window.cancelAnimationFrame(resetFrame);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const rememberProjectNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank") {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin === window.location.origin &&
        destination.pathname.startsWith("/work/")
      ) {
        sessionStorage.setItem(returnToHomeKey, "true");
      }
    };

    document.addEventListener("click", rememberProjectNavigation, true);
    return () => {
      document.removeEventListener("click", rememberProjectNavigation, true);
    };
  }, []);

  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const pageContent = document.querySelectorAll<HTMLElement>(
      "main > :not(.loading-experience)",
    );

    document.body.classList.add("loader-active");
    pageContent.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    return () => {
      document.body.classList.remove("loader-active");
      pageContent.forEach((element) => {
        element.inert = false;
        element.removeAttribute("aria-hidden");
      });
    };
  }, [isActive]);

  useEffect(() => {
    if (stage !== "intro") {
      return undefined;
    }

    const slideTimer = window.setTimeout(() => {
      if (slideIndex < introSlides.length - 1) {
        setSlideIndex((current) => current + 1);
      } else {
        setStage("loading");
      }
    }, slideDuration);

    return () => window.clearTimeout(slideTimer);
  }, [slideDuration, slideIndex, stage]);

  useEffect(() => {
    if (stage !== "loading") {
      return undefined;
    }

    setProgressReady(false);
    const progressTimer = window.setTimeout(() => setProgressReady(true), 80);
    const exitTimer = window.setTimeout(
      () => setStage("exiting"),
      reduceMotion ? 500 : 1900,
    );

    return () => {
      window.clearTimeout(progressTimer);
      window.clearTimeout(exitTimer);
    };
  }, [reduceMotion, stage]);

  useEffect(() => {
    if (stage !== "exiting") {
      return undefined;
    }

    const doneTimer = window.setTimeout(
      () => setStage("done"),
      reduceMotion ? 120 : 1200,
    );
    return () => window.clearTimeout(doneTimer);
  }, [reduceMotion, stage]);

  const advanceIntro = () => {
    if (slideIndex < introSlides.length - 1) {
      setSlideIndex((current) => current + 1);
      return;
    }

    setStage("loading");
  };

  if (stage === "done") {
    return null;
  }

  return (
    <div
      className={`loading-experience is-${stage}`}
      aria-label="Introducción de El Yeipi"
      aria-live="polite"
      aria-modal="true"
      role="dialog"
    >
      <div className="loader-frame" aria-hidden="true" />

      {stage === "intro" ? (
        <div className="intro-stage">
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className="intro-copy"
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -18, filter: "blur(8px)" }
              }
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 24, filter: "blur(9px)" }
              }
              key={introSlides[slideIndex]}
              transition={{ duration: reduceMotion ? 0.15 : 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* <p className="intro-index" aria-hidden="true">
                0{slideIndex + 1} / 0{introSlides.length}
              </p> */}
              <h2>{introSlides[slideIndex]}</h2>
            </motion.div>
          </AnimatePresence>

          <button
            aria-label={
              slideIndex === introSlides.length - 1
                ? "Continuar al sitio"
                : "Siguiente frase"
            }
            className="intro-next"
            onClick={advanceIntro}
            type="button"
          >
            <IntroProgressRing
              duration={slideDuration}
              key={slideIndex}
              reduceMotion={Boolean(reduceMotion)}
            />
            <ArrowRight aria-hidden="true" size={22} strokeWidth={1.5} />
          </button>

          <button
            className="intro-skip"
            onClick={() => setStage("loading")}
            type="button"
          >
            Saltar intro <ArrowRight aria-hidden="true" size={14} strokeWidth={1.5} />
          </button>
        </div>
      ) : (
        <div className="loader-content">
          <div className="loader-brand">
            <p>el yeipi</p>
            <span>producer, filmmaker, memory maker</span>
          </div>

          <div className="loader-progress" aria-label="Cargando sitio">
            <span className="loader-progress-track" aria-hidden="true">
              <span
                className={`loader-progress-value${progressReady ? " is-ready" : ""}`}
              />
            </span>
            <span className="loader-progress-label">Cargando</span>
          </div>
        </div>
      )}
    </div>
  );
}
