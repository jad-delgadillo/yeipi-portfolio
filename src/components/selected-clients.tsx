import Image from "next/image";
import { brandLogos } from "@/lib/site-content";

const marqueeGroups = [0, 1];

export function SelectedClients() {
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
        <div className="client-marquee-track">
          {marqueeGroups.map((group) => (
            <div className="client-marquee-group" key={group}>
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
