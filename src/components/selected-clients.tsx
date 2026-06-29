import Image from "next/image";
import { selectedClients } from "@/lib/site-content";

export function SelectedClients() {
  return (
    <section className="selected-clients-section" aria-labelledby="clients-title">
      <div className="selected-clients-shell">
        <div className="selected-clients-heading flex flex-col gap-1 justfy-start items-start">
          <p className="eyebrow light text-[#F9583C]! capitalize! text-lg!" id="clients-title">Clientes</p>
        </div>

        <div className="client-mosaic" aria-label="Clientes destacados">
          {selectedClients.map((client) => (
            <article className="client-tile" key={client.name}>
              <div className="client-tile-bg-wrapper">
                <Image
                  src={client.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="client-tile-bg object-cover"
                />
              </div>
              <div className="client-tile-overlay"></div>
              <Image
                alt={client.name}
                className="client-tile-logo"
                height={82}
                src={client.logo}
                width={220}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
