import Image from "next/image";
import { selectedClients } from "@/lib/site-content";

export function SelectedClients() {
  return (
    <section className="selected-clients-section" aria-labelledby="clients-title">
      <div className="selected-clients-shell">
        <div className="selected-clients-heading">
          <p className="eyebrow light text-[#F9583C]! capitalize! text-lg!">Clientes</p>
          <h2 id="clients-title">Marcas con mundo propio.</h2>
        </div>

        <div className="client-mosaic" aria-label="Clientes y trabajos destacados">
          {selectedClients.map((client) => (
            <article className="client-tile" key={client.name}>
              <Image
                alt=""
                className="client-tile-image"
                fill
                sizes="(max-width: 760px) 50vw, 25vw"
                src={client.image}
              />
              <div className="client-tile-scrim" />
              <Image
                alt={client.name}
                className="client-tile-logo"
                data-tone={client.logoTone}
                height={82}
                src={client.logo}
                width={220}
              />
              <p>{client.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
