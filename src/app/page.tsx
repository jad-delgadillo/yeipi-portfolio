import Image from "next/image";
import { CTAButton } from "@/components/cta-button";
import { Hero } from "@/components/hero";
import { LoadingExperience } from "@/components/loading-experience";
import { Marquee } from "@/components/marquee";
import { MobileDock } from "@/components/mobile-dock";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import {
  brand,
  process,
  projects,
  proofLines,
  services,
} from "@/lib/site-content";

export default function Home() {
  return (
    <main className="min-h-screen">
      <LoadingExperience />
      <Nav />
      <MobileDock />
      <Hero />

      <section className="story-block" id="story" aria-labelledby="story-title">
        <Reveal>
          <p className="eyebrow">La premisa</p>
          <h2 id="story-title">
            La gente no necesita otro clip. Necesita una escena en la que pueda
            entrar.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="story-copy">
            Convertimos personas, lugares, lanzamientos, promesas y
            celebraciones en videos y fotografías con un punto de vista. El
            trabajo se siente cuidado pero vivo, pulido pero cercano, hecho para
            que la audiencia sienta que estuvo ahí.
          </p>
        </Reveal>
      </section>

      <section className="proof-section" aria-label="Tipos de historia">
        <Marquee items={proofLines} />
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <Reveal>
          <p className="eyebrow light">En acción</p>
          <h2 id="work-title">Historias con pulso.</h2>
        </Reveal>
        <div className="project-grid">
          {projects.map((project, index) => (
            <Reveal
              as="article"
              className="project-card"
              delay={index * 0.08}
              key={project.title}
            >
              <Image
                src={project.image}
                alt=""
                width={900}
                height={1125}
                sizes="(max-width: 980px) 100vw, 33vw"
              />
              <div>
                <p>{project.category}</p>
                <h3>{project.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="services-section" id="services" aria-labelledby="services-title">
        <Reveal className="services-intro">
          <p className="eyebrow">Lo que hacemos</p>
          <h2 id="services-title">Cine para los momentos que tu marca no puede fingir.</h2>
        </Reveal>
        <div className="service-grid">
          {services.map((service) => (
            <Reveal as="article" className="service-card" key={service.title}>
              <service.icon aria-hidden="true" size={24} strokeWidth={1.8} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="vision-section" aria-labelledby="vision-title">
        <div className="tilted-frame large">
          <Image
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85"
            alt=""
            width={800}
            height={1000}
            sizes="(max-width: 980px) 420px, 30vw"
          />
        </div>
        <Reveal className="vision-copy">
          <p className="stamp">capturando espíritu humano</p>
          <h2 id="vision-title">Deja que tu visión dirija la escena.</h2>
          <p>
            La cámara es solo el instrumento. El verdadero oficio está en saber
            dónde mirar, cuándo esperar y cómo transformar momentos honestos en
            una memoria visual que se mueve.
          </p>
        </Reveal>
        <div className="tilted-frame small">
          <Image
            src="https://images.unsplash.com/photo-1500634245200-e5245c7574ef?auto=format&fit=crop&w=900&q=85"
            alt=""
            width={640}
            height={800}
            sizes="(max-width: 980px) 420px, 22vw"
          />
        </div>
      </section>

      <section className="process-section" aria-labelledby="process-title">
        <Reveal>
          <p className="eyebrow">Cómo funciona</p>
          <h2 id="process-title">Un arco de producción simple.</h2>
        </Reveal>
        <div className="process-grid">
          {process.map((step) => (
            <Reveal as="article" className="process-card" key={step.title}>
              <step.icon aria-hidden="true" size={22} strokeWidth={1.8} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <Reveal>
          <p className="eyebrow light">El siguiente plano</p>
          <h2 id="contact-title">Trae la historia. Nosotros ponemos el cine.</h2>
          <p>
            Con base en {brand.location}. Disponible para proyectos
            comerciales, eventos, bodas y trabajo editorial.
          </p>
          <CTAButton href={`mailto:${brand.email}`}>Empecemos la conversación</CTAButton>
        </Reveal>
      </section>
    </main>
  );
}
