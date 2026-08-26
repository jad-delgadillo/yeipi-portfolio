"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { services } from "@/lib/site-content";

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className="services-section"
      id="services"
      aria-labelledby="services-title"
    >
      <Reveal className="services-intro">
        <p className="eyebrow">Qué puedes contratar</p>
        <h2 id="services-title">Una forma de contar lo que ya está pasando.</h2>
        <p className="services-intro-copy">
          No necesitas llegar con una lista de tomas. Podemos partir de tu
          negocio, una fecha o una necesidad concreta y convertirla en una
          pieza con intención.
        </p>
      </Reveal>

      <div className="services-desktop-split">
        <div className="services-list-side">
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                aria-expanded={isActive}
                className={`service-list-item ${isActive ? "is-active" : ""}`}
                key={service.title}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                type="button"
              >
                <span className="service-item-header">
                  <span className="service-num">{service.number}</span>
                  <span className="service-title">{service.title}</span>
                </span>
                <span className="service-desc-wrapper">
                  <span className="service-desc">{service.description}</span>
                  <span className="service-ideal">Ideal para: {service.ideal}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="services-image-side" aria-hidden="true">
          <div className="services-sticky-image-container">
            {services.map((service, index) => (
              <Image
                alt=""
                className={`service-sticky-image ${activeIndex === index ? "is-visible" : ""}`}
                fill
                key={service.title}
                sizes="36vw"
                src={service.image}
              />
            ))}
            <div className="service-sticky-image-scrim" />
            <span className="service-sticky-label">
              {services[activeIndex].number} / {services[activeIndex].title}
            </span>
          </div>
        </div>
      </div>

      <div className="services-mobile-list">
        {services.map((service) => (
          <article className="service-mobile-card" key={service.title}>
            <Image
              alt=""
              className="service-mobile-image"
              fill
              sizes="calc(100vw - 28px)"
              src={service.image}
            />
            <div className="service-mobile-scrim" />
            <div className="service-mobile-copy">
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <small>Ideal para: {service.ideal}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
