"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

type ProcessStep = {
  title: string;
  text: string;
};

type ProcessTimelineProps = {
  steps: ProcessStep[];
};

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

  // Render the abstract geometric SVG line art for each step
  const renderVisual = (index: number) => {
    switch (index) {
      case 0:
        // STEP 1: Overlapping concentric Venn-like circles (Finding the core/premise)
        return (
          <div className="timeline-visual-card card-geometric">
            <svg viewBox="0 0 300 300" className="w-[82%] h-[82%] text-neutral-100 select-none pointer-events-none">
              {/* Central axis marker */}
              <circle cx={150} cy={150} r={2} fill="var(--accent)" opacity={0.5} />
              
              {/* Ring guides */}
              <circle cx={150} cy={150} r={120} stroke="rgba(255,255,255,0.03)" strokeWidth={1} fill="none" strokeDasharray="3 6" />
              <circle cx={150} cy={150} r={40} stroke="rgba(255,255,255,0.03)" strokeWidth={1} fill="none" />

              {/* Rotating group of 5 overlapping circles */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                style={{ originX: "150px", originY: "150px" }}
              >
                {[
                  { cx: 150, cy: 118 }, // Top
                  { cx: 180.4, cy: 140.1 }, // Top-Right
                  { cx: 168.8, cy: 175.9 }, // Bottom-Right
                  { cx: 131.2, cy: 175.9 }, // Bottom-Left
                  { cx: 119.6, cy: 140.1 }, // Top-Left
                ].map((pos, i) => (
                  <motion.circle
                    key={i}
                    cx={pos.cx}
                    cy={pos.cy}
                    r={60}
                    stroke={i === 0 ? "var(--accent)" : "rgba(255, 255, 255, 0.16)"}
                    strokeWidth={i === 0 ? 1.5 : 1}
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: 1,
                      strokeWidth: i === 0 ? [1.5, 2, 1.5] : [1, 1.3, 1]
                    }}
                    transition={{
                      pathLength: { duration: 1.5, ease: "easeOut", delay: i * 0.15 },
                      opacity: { duration: 1, delay: i * 0.15 },
                      strokeWidth: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                ))}
              </motion.g>

              {/* Decorative target reticle lines */}
              <line x1={150} y1={10} x2={150} y2={30} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
              <line x1={150} y1={270} x2={150} y2={290} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
              <line x1={10} y1={150} x2={30} y2={150} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
              <line x1={270} y1={150} x2={290} y2={150} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
            </svg>

            {/* Step label overlay */}
            <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-[9px] font-mono text-white/40 tracking-widest select-none pointer-events-none">
              <span>ESTRUCTURA DE INTENCIÓN</span>
              <span>01 / CONVERGENCIA</span>
            </div>
          </div>
        );
      case 1:
        // STEP 2: Sunburst/Shutter aperture with offset floating circle (Optics, Light & Rhythm)
        const radialLinesCount = 36;
        return (
          <div className="timeline-visual-card card-geometric">
            <svg viewBox="0 0 300 300" className="w-[82%] h-[82%] text-neutral-100 select-none pointer-events-none">
              {/* Rotating diaphragm lines */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                style={{ originX: "150px", originY: "150px" }}
              >
                {Array.from({ length: radialLinesCount }).map((_, i) => {
                  const angle = (i * (360 / radialLinesCount) * Math.PI) / 180;
                  const innerR = 32;
                  const outerR = 120;
                  const x1 = 150 + innerR * Math.cos(angle);
                  const y1 = 150 + innerR * Math.sin(angle);
                  const x2 = 150 + outerR * Math.cos(angle);
                  const y2 = 150 + outerR * Math.sin(angle);
                  
                  return (
                    <motion.line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth={1}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: i % 3 === 0 ? 0.35 : 0.12 }}
                      transition={{ duration: 1.2, delay: i * 0.02 }}
                    />
                  );
                })}
              </motion.g>

              {/* Central iris aperture ring */}
              <circle cx={150} cy={150} r={32} stroke="rgba(255,255,255,0.16)" strokeWidth={1} fill="none" />
              <circle cx={150} cy={150} r={35} stroke="rgba(255,255,255,0.04)" strokeWidth={1} fill="none" />
              
              {/* Off-center floating circle (representing lens elements/refraction) */}
              <motion.circle
                cx={180}
                cy={150}
                r={72}
                stroke="var(--accent)"
                strokeWidth={1.5}
                fill="rgba(249, 88, 60, 0.02)"
                animate={{
                  x: [0, 8, -6, 0],
                  y: [0, -10, 4, 0],
                  scale: [1, 1.02, 0.98, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ originX: "180px", originY: "150px" }}
              />

              <circle cx={180} cy={150} r={75} stroke="rgba(255, 255, 255, 0.04)" strokeWidth={1} fill="none" />
            </svg>

            {/* Step label overlay */}
            <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-[9px] font-mono text-white/40 tracking-widest select-none pointer-events-none">
              <span>LENGUAJE ÓPTICO & RITMO</span>
              <span>02 / DIFRACCIÓN</span>
            </div>
          </div>
        );
      case 2:
        // STEP 3: Projection cone and concentric resonance waves (Echoes/Synergy)
        return (
          <div className="timeline-visual-card card-geometric">
            <svg viewBox="0 0 300 300" className="w-[82%] h-[82%] text-neutral-100 select-none pointer-events-none">
              {/* Concentric expanding ripples (Resonance/Echo) */}
              {[1, 2, 3].map((val) => (
                <motion.circle
                  key={val}
                  cx={75}
                  cy={150}
                  r={30}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth={1}
                  fill="none"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ 
                    scale: 4.8, 
                    opacity: [0, 0.28, 0],
                    stroke: ["rgba(255,255,255,0.1)", "var(--accent)", "rgba(255,255,255,0)"]
                  }}
                  transition={{ 
                    duration: 4.5, 
                    repeat: Infinity, 
                    ease: "easeOut",
                    delay: val * 1.5
                  }}
                />
              ))}

              {/* Static lens emitter source */}
              <circle cx={75} cy={150} r={16} stroke="rgba(255,255,255,0.24)" strokeWidth={1} fill="none" />
              <circle cx={75} cy={150} r={6} fill="var(--accent)" />

              {/* Cinematic screen frame outline */}
              <rect x={185} y={105} width={95} height={90} rx={4} stroke="rgba(255, 255, 255, 0.2)" strokeWidth={1.5} fill="rgba(255, 255, 255, 0.02)" />
              <rect x={189} y={109} width={87} height={82} rx={2} stroke="rgba(255, 255, 255, 0.05)" strokeWidth={1} fill="none" />

              {/* Projector light rays (lines connecting lens to screen corners) */}
              <motion.line
                x1={75}
                y1={150}
                x2={185}
                y2={105}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth={1}
                strokeDasharray="2 2"
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.line
                x1={75}
                y1={150}
                x2={185}
                y2={195}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth={1}
                strokeDasharray="2 2"
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />

              {/* Light rays volume representation */}
              <polygon
                points="75,150 185,105 185,195"
                fill="linear-gradient(to right, rgba(249, 88, 60, 0.04), transparent)"
                opacity={0.12}
                className="hidden" // Handled by inline CSS due to gradient details
                style={{ fill: "url(#projGradient)" }}
              />

              <defs>
                <linearGradient id="projGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <polygon points="75,150 185,105 185,195" fill="url(#projGradient)" />

              {/* Framing crosshairs inside the screen */}
              <path d="M 227.5,145 L 227.5,155 M 222.5,150 L 232.5,150" stroke="rgba(255,255,255,0.16)" strokeWidth={1} />
            </svg>

            {/* Step label overlay */}
            <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-[9px] font-mono text-white/40 tracking-widest select-none pointer-events-none">
              <span>PROYECCIÓN & RESONANCIA</span>
              <span>03 / DIFUSIÓN</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="handoff-timeline">
      <div className="handoff-rail" aria-hidden="true" />

      {/* Responsive layout wrapper: grid on desktop, simple list flow on mobile */}
      <div className="handoff-layout-grid">
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

        {/* Sticky Visuals Panel - Visible only on Desktop views */}
        <div className="timeline-visuals-panel">
          <div className="visuals-sticky-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="visual-motion-container"
              >
                {renderVisual(activeStep)}
              </motion.div>
            </AnimatePresence>
            
            {/* Ambient colorful glow corresponding to the active step */}
            <div
              className="visuals-ambient-glow"
              style={{
                background:
                  activeStep === 0
                    ? "radial-gradient(circle, rgba(249, 88, 60, 0.05) 0%, rgba(0,0,0,0) 70%)"
                    : activeStep === 1
                    ? "radial-gradient(circle, rgba(14, 165, 233, 0.04) 0%, rgba(0,0,0,0) 70%)"
                    : "radial-gradient(circle, rgba(168, 85, 247, 0.04) 0%, rgba(0,0,0,0) 70%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


