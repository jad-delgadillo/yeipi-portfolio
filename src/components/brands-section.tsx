import Image from "next/image";
import { brandLogos } from "@/lib/site-content";

export function BrandsSection() {
  const marqueeLogos = [...brandLogos, ...brandLogos];

  return (
    <section
      className="brands-section"
      aria-labelledby="brands-title"
    >
      <div className="brands-heading w-fit flex items-center rounded-lg p-4! justify-center">
        <p className="eyebrow text-black/90!" id="brands-title">Colaboraciones con</p>
      </div>

      <div className="brands-marquee" aria-label="Marcas con las que ha trabajado">
        <div className="brands-track border-y border-[1px]! border-black/90">
          {marqueeLogos.map((logo, index) => (
          <div
            aria-hidden={index >= brandLogos.length}
            className="brand-logo-card"
            data-tone={logo.tone}
            key={`${logo.src}-${index}`}
          >
            <Image
              alt={index < brandLogos.length ? logo.name : ""}
              height={96}
              src={logo.src}
              width={260}
            />
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
