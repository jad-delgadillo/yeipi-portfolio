"use client";

import { useEffect, useState, useRef } from "react";

type ProcessStep = {
  title: string;
  text: string;
};

type ProcessTimelineProps = {
  steps: ProcessStep[];
};

const videoUrls = [
  "https://pub-d24c6b501d254fb2949ddc37e644d121.r2.dev/videos/editorial/ffmpeg%20Corro.mp4",
  "https://pub-d24c6b501d254fb2949ddc37e644d121.r2.dev/videos/sports/ffmpeg%20hyrox.mp4",
  "https://pub-d24c6b501d254fb2949ddc37e644d121.r2.dev/videos/bodas/JESSE%CC%81%20%26%20HILDA/ffmpeg%20wedding.mp4",
];

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState(0);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observerOptions = {
      root: null,
      // Trigger when the element is centered in the viewport
      rootMargin: "-28% 0px -38% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          if (!isNaN(index)) {
            setActiveStep(index);
          }
        }
      });
    }, observerOptions);

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, [steps]);

  return (
    <div className="handoff-timeline">
      {/* Background Videos with Crossfade Logic */}
      <div className="process-section-video-bg">
        {videoUrls.map((url, idx) => (
          <video
            key={idx}
            src={url}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`process-section-video ${activeStep === idx ? "active" : ""}`}
          />
        ))}
        <div className="process-section-video-overlay" />
      </div>

      <div className="handoff-rail" aria-hidden="true" />

      <div className="handoff-list">
        {steps.map((step, index) => (
          <article
            className="handoff-item"
            key={step.title}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            data-index={index}
          >
            <span className="handoff-dot" aria-hidden="true" />
            <div className="handoff-item-copy">
              <div className="handoff-kicker">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i aria-hidden="true" />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
