"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BadgeCheck, MessageCircle } from "lucide-react";
import { CTAButton } from "@/components/cta-button";
import { brand, heroVideo } from "@/lib/site-content";

export function Hero() {
  const shellRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const { scrollYProgress } = useScroll({
    target: shellRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 0.38, 0.72], [1, 0.965, 0.94]);
  const heroRadius = useTransform(scrollYProgress, [0, 0.38, 0.72], ["0px", "18px", "28px"]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 641px)");
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section ref={shellRef} className="hero-shell" id="top" aria-labelledby="hero-title">
      <motion.div
        className="hero-section"
        style={isDesktop ? { scale: heroScale, borderRadius: heroRadius } : undefined}
      >
        <motion.div
          className="hero-media"
          initial={false}
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
          className="hero-content app-profile"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex w-full justify-between font-bold opacity-80 text-sm" aria-hidden="true">
            <span>El Yeipi</span>
            <span>Portfolio</span>
          </div>

          <div className="rounded-3xl p-4 gap-2 bg-black/40 backdrop-blur-lg border border-white/10 flex flex-col">
            {/* <h1>{brand.name} <BadgeCheck aria-hidden="true" size={19} strokeWidth={2.4} /></h1> */}
            {/* <p className="hero-kicker">{brand.location}</p> */}
            <h4 className="text-3xl!" id="hero-title">Historias reales con feeling de cine.</h4>
            <p className="text-xs">
              Cine, fotografía y dirección para marcas, bodas y momentos que
              necesitan sentirse vivos.
            </p>

            {/* <div className="profile-stats">
              <div>
                <strong>48</strong>
                <span>films</span>
              </div>
              <div>
                <strong>12K</strong>
                <span>views</span>
              </div>
              <div>
                <strong>360</strong>
                <span>stories</span>
              </div>
            </div> */}

            <div className="profile-actions">
              <CTAButton href="#work">Ver proyectos</CTAButton>
              <a className="ghost-action" href="#contact">
                <MessageCircle aria-hidden="true" size={18} strokeWidth={2.1} />
                Hablemos
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
