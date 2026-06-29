"use client";

import { CTAButton } from "@/components/cta-button";
import { heroVideo } from "@/lib/site-content";

export function Hero() {
  return (
    <section className="hero-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-section">
        <div className="hero-media">
          <video
            aria-hidden="true"
            autoPlay
            loop
            muted
            playsInline
            poster={heroVideo.poster}
            preload="metadata"
          >
            <source src={heroVideo.src} type="video/mp4" />
          </video>
          <div className="hero-scrim" />
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

          {/* Desktop Hero Layout: Centered copy & action buttons */}
          <div className="hero-bottom-row hidden md:flex">
            <div className="desktop-hero-copy">
              <p className="hero-kicker">El Yeipi</p>
              <h1 id="hero-title" className="hero-title-font">Historias reales, hechas cine.</h1>
              <p className="desktop-hero-description hero-description-font">
                Cine, fotografía y dirección para marcas, bodas y momentos que
                necesitan sentirse vivos.
              </p>
            </div>

            <div className="desktop-hero-actions">
              <a className="hero-btn hero-btn-bright" href="#work">
                Ver proyectos
              </a>
              <a className="hero-btn hero-btn-dark" href="#contact">
                Hablemos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
