"use client";

import { useRef, useState } from "react";
import { Search, ShoppingBag, Play, Pause } from "lucide-react";
import { CTAButton } from "@/components/cta-button";
import { heroVideo } from "@/lib/site-content";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="hero-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-section">
        {/* Navigation Bar inside the hero on Desktop */}
        <header className="hero-top-nav" aria-label="Navegación del sitio">
          <div className="hero-top-nav-inner">
            <a href="#top" className="hero-top-nav-logo" aria-label="Inicio">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
            </a>
            <div className="hero-top-nav-links">
              <a href="#work">Proyectos</a>
              <a href="#story">La historia</a>
              <a href="#services">Servicios</a>
              <a href="#contact">Contacto</a>
            </div>
            <div className="hero-top-nav-actions">
              <Search size={15} strokeWidth={2.4} aria-label="Buscar" />
              <ShoppingBag size={15} strokeWidth={2.4} aria-label="Bolsa" />
            </div>
          </div>
        </header>

        <div className="hero-media">
          <video
            aria-hidden="true"
            autoPlay
            loop
            muted
            playsInline
            poster={heroVideo.poster}
            preload="metadata"
            ref={videoRef}
          >
            <source src={heroVideo.src} type="video/mp4" />
          </video>
          <div className="hero-scrim" />
        </div>

        {/* Round Play/Pause Video Toggle Button in Top Right */}
        <div className="hero-controls-row">
          <button
            className="hero-play-pause-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
            type="button"
          >
            {isPlaying ? (
              <Pause size={16} fill="currentColor" strokeWidth={0} />
            ) : (
              <Play size={16} fill="currentColor" strokeWidth={0} />
            )}
          </button>
        </div>

        <div className="hero-content app-profile">
          <div className="flex md:hidden block w-full justify-between font-bold opacity-80 text-sm" aria-hidden="true">
            <span>El Yeipi</span>
            <span>Portfolio</span>
          </div>

          {/* Mobile Hero Copy card */}
          <div className="hero-card-mobile block md:hidden flex flex-col bg-transparent backdrop-blur-lg backdrop-filter backdrop-brightness-50 border-white/10 border-[1px] rounded-3xl p-4">
            <div className="flex flex-col gap-2 mb-2">
              <h1 id="hero-title-mobile" className="font-light text-3xl">
                Historias reales, hechas cine.
              </h1>
              <p className="text-xs">
                Cine, fotografía y dirección para marcas, bodas y momentos que
                necesitan sentirse vivos.
              </p>
            </div>

            <div className="profile-actions">
              <CTAButton href="#work">Ver proyectos</CTAButton>
              <a className="ghost-action border-none!" href="#contact">
                Hablemos
              </a>
            </div>
          </div>

          {/* Desktop Hero Layout: Copy on bottom left, CTA on bottom right */}
          <div className="hero-bottom-row hidden md:flex">
            <div className="desktop-hero-copy">
              <p className="hero-kicker">El Yeipi</p>
              <h1 id="hero-title">Historias reales, hechas cine.</h1>
              <p className="desktop-hero-description">
                Cine, fotografía y dirección para marcas, bodas y momentos que
                necesitan sentirse vivos.
              </p>
            </div>

            <div className="hero-cta-column">
              <div className="hero-cta-capsule">
                <span>MX / Worldwide</span>
                <a className="hero-cta-blue-btn" href="#contact">
                  Hablemos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
