"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Service = {
  number: string;
  title: string;
  description: string;
  ideal: string;
  image: string;
};

type ServicesShowcaseProps = {
  services: Service[];
};

export function ServicesShowcase({ services }: ServicesShowcaseProps) {
  const frameRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [];

    return Array.from(track.querySelectorAll<HTMLElement>(".service-showcase-card"));
  }, []);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    const cards = getCards();
    if (!track || !cards.length) return;

    const trackLeft = track.getBoundingClientRect().left;
    const nearestIndex = cards.reduce((nearest, card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
      const nearestDistance = Math.abs(
        cards[nearest].getBoundingClientRect().left - trackLeft,
      );

      return distance < nearestDistance ? index : nearest;
    }, 0);

    setActiveIndex((current) => (current === nearestIndex ? current : nearestIndex));
  }, [getCards]);

  const scheduleActiveIndexUpdate = useCallback(() => {
    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    const cards = getCards();
    const target = cards[index];
    if (!track || !target) return;

    track.scrollTo({
      behavior: "smooth",
      left: target.offsetLeft - track.offsetLeft,
    });
    setActiveIndex(index);
  };

  const scrollCards = (direction: -1 | 1) => {
    scrollToCard(Math.min(Math.max(activeIndex + direction, 0), services.length - 1));
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    scheduleActiveIndexUpdate();
    track.addEventListener("scroll", scheduleActiveIndexUpdate, { passive: true });
    window.addEventListener("resize", scheduleActiveIndexUpdate);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      track.removeEventListener("scroll", scheduleActiveIndexUpdate);
      window.removeEventListener("resize", scheduleActiveIndexUpdate);
    };
  }, [scheduleActiveIndexUpdate]);

  return (
    <div className="services-showcase">
      <div className="services-showcase-track" ref={trackRef}>
        {services.map((service, index) => (
          <article
            className="service-showcase-card"
            data-active={index === activeIndex}
            key={service.title}
          >
            <div className="service-showcase-media">
              <Image
                alt=""
                className="service-showcase-image"
                fill
                sizes="(max-width: 760px) 82vw, (max-width: 1180px) 42vw, 440px"
                src={service.image}
              />
            </div>
            <div className="service-showcase-copy">
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <small>{service.ideal}</small>
            </div>
          </article>
        ))}
      </div>

      <div className="services-showcase-actions" aria-label="Controles de formatos">
        <button
          aria-label="Formato anterior"
          disabled={activeIndex === 0}
          onClick={() => scrollCards(-1)}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={24} strokeWidth={2.8} />
        </button>
        <button
          aria-label="Formato siguiente"
          disabled={activeIndex >= services.length - 1}
          onClick={() => scrollCards(1)}
          type="button"
        >
          <ChevronRight aria-hidden="true" size={24} strokeWidth={2.8} />
        </button>
      </div>
    </div>
  );
}
