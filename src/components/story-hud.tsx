"use client";

import { useEffect, useRef } from "react";

export function StoryHud() {
  const tcRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Initial random start timecode
    let hours = 14;
    let minutes = 2;
    let seconds = 55;
    let frames = 8;

    const interval = setInterval(() => {
      frames++;
      if (frames >= 24) {
        frames = 0;
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
            minutes = 0;
            hours++;
            if (hours >= 24) {
              hours = 0;
            }
          }
        }
      }

      if (tcRef.current) {
        const hh = String(hours).padStart(2, "0");
        const mm = String(minutes).padStart(2, "0");
        const ss = String(seconds).padStart(2, "0");
        const ff = String(frames).padStart(2, "0");
        tcRef.current.textContent = `${hh}:${mm}:${ss}:${ff}`;
      }
    }, 1000 / 24); // approx 41.6ms for 24fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="story-hud-container hidden md:block pointer-events-none select-none absolute inset-0 z-0 overflow-hidden">
      {/* Viewfinder Corners */}
      <div className="story-hud-bracket top-10 left-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 24,0 L 0,0 L 0,24" />
        </svg>
      </div>
      <div className="story-hud-bracket top-10 right-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 0,0 L 24,0 L 24,24" />
        </svg>
      </div>
      <div className="story-hud-bracket bottom-10 left-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 0,0 L 0,24 L 24,24" />
        </svg>
      </div>
      <div className="story-hud-bracket bottom-10 right-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 0,24 L 24,24 L 24,0" />
        </svg>
      </div>

      {/* Left Panel Metadata */}
      <div className="absolute left-10 lg:left-14 top-1/2 -translate-y-1/2 flex flex-col gap-6 font-mono text-[9px] md:text-[10px]">
        <div className="flex flex-col gap-1">
          <span className="story-hud-meta-label text-[8px] uppercase tracking-widest">RECORDING SYS</span>
          <span className="story-hud-meta-value font-bold">RED V-RAPTOR 8K</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="story-hud-meta-label text-[8px] uppercase tracking-widest">OPTICS</span>
          <span className="story-hud-meta-value font-bold">COOKE S4/i 35MM</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="story-hud-meta-label text-[8px] uppercase tracking-widest">TIMECODE</span>
          <span ref={tcRef} className="story-hud-meta-value font-bold tabular-nums">14:02:55:08</span>
        </div>
      </div>

      {/* Right Panel Metadata */}
      <div className="absolute right-10 lg:right-14 top-1/2 -translate-y-1/2 flex flex-col gap-6 font-mono text-[9px] md:text-[10px] items-end text-right">
        <div className="flex items-center gap-2">
          <span className="story-hud-meta-label text-[8px] uppercase tracking-widest">REC STATE</span>
          <div className="flex items-center gap-1.5 font-bold story-hud-rec-val">
            <span className="story-hud-rec-dot w-2 h-2 rounded-full bg-[#F9583C]"></span>
            REC
          </div>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="story-hud-meta-label text-[8px] uppercase tracking-widest">CAMERA SPECS</span>
          <span className="story-hud-meta-value font-bold">24.00 FPS · 180° · ISO 800</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="story-hud-meta-label text-[8px] uppercase tracking-widest">AUDIO LEVEL</span>
          <div className="story-audio-bars flex gap-0.5 mt-1 h-3 items-end">
            <span className="story-audio-bar story-audio-bar-1 w-[2px]"></span>
            <span className="story-audio-bar story-audio-bar-2 w-[2px]"></span>
            <span className="story-audio-bar story-audio-bar-3 w-[2px]"></span>
            <span className="story-audio-bar story-audio-bar-4 w-[2px]"></span>
            <span className="story-audio-bar story-audio-bar-5 w-[2px]"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
