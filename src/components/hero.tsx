"use client";

import { motion } from "motion/react";
import { CTAButton } from "@/components/cta-button";
import { brand, heroVideo } from "@/lib/site-content";


export function Hero() {
  return (
    <section className="hero-shell" id="top" aria-labelledby="hero-title">
      {/* <h1 className="hero-title-mobile font-bold">El Yeipi</h1> */}
      <div className="hero-section">
        <motion.div
          className="hero-media"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero-kicker">{brand.location}</p>
          <h1 id="hero-title">Haz que tu historia se sienta como una película.</h1>
          <p>
            Películas y fotografía para personas, marcas, lugares y momentos que merecen más que documentación.
          </p>
          <CTAButton href="#contact">Planeemos tu proyecto</CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
