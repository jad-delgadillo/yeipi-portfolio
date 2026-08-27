"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { brandLogos } from "@/lib/site-content";

const marqueeGroups = [0, 1];
const marqueeSpeed = 72;

export function SelectedClients() {
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstGroup = firstGroupRef.current;
    const track = trackRef.current;

    if (!firstGroup || !track) {
      return undefined;
    }

    const syncMarqueeSpeed = () => {
      const distance = firstGroup.getBoundingClientRect().width;

      track.style.setProperty("--client-marquee-distance", `-${distance}px`);
      track.style.setProperty(
        "--client-marquee-duration",
        `${distance / marqueeSpeed}s`,
      );
    };

    syncMarqueeSpeed();

    const resizeObserver = new ResizeObserver(syncMarqueeSpeed);
    resizeObserver.observe(firstGroup);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section className="selected-clients-section" aria-labelledby="clients-title">
      <div className="selected-clients-shell">
        {/* <div className="selected-clients-heading flex flex-col gap-1 justfy-start items-start">
          <p className="eyebrow light" id="clients-title">Marcas y proyectos</p>
        </div> */}
      </div>

      <p className="sr-only">
        Marcas destacadas: {brandLogos.map((brandLogo) => brandLogo.name).join(", ")}.
      </p>
      <div className="client-marquee" aria-hidden="true">
        <div className="client-marquee-track" ref={trackRef}>
          {marqueeGroups.map((group) => (
            <div
              className="client-marquee-group"
              key={group}
              ref={group === 0 ? firstGroupRef : undefined}
            >
              {brandLogos.map((brandLogo) => (
                <div
                  className="client-marquee-item"
                  data-tone={brandLogo.tone}
                  key={`${group}-${brandLogo.name}`}
                >
                  <Image
                    alt=""
                    className="client-marquee-logo"
                    height={96}
                    src={brandLogo.src}
                    width={240}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
