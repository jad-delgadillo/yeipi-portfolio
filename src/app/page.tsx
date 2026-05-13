import Image from "next/image";
import { CTAButton } from "@/components/cta-button";
import { Hero } from "@/components/hero";
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
      <Nav />
      <MobileDock />
      <Hero />

      <section className="story-block" id="story" aria-labelledby="story-title">
        <Reveal>
          <p className="eyebrow">The pitch</p>
          <h2 id="story-title">
            People do not need another clip. They need a scene they can step
            into.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="story-copy">
            We turn real people, places, launches, vows, and celebrations into
            films and photographs with a point of view. The work feels composed
            but alive, polished but never distant, built to make the audience
            believe they were there.
          </p>
        </Reveal>
      </section>

      <section className="proof-section" aria-label="Story types">
        <Marquee items={proofLines} />
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <Reveal>
          <p className="eyebrow light">See it in action</p>
          <h2 id="work-title">Stories with a pulse.</h2>
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
          <p className="eyebrow">What we make</p>
          <h2 id="services-title">Cinema for the moments your brand cannot fake.</h2>
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
          <p className="stamp">capturing human spirit</p>
          <h2 id="vision-title">Let your vision direct the room.</h2>
          <p>
            The camera is only the instrument. The real craft is knowing where
            to look, when to wait, and how to shape honest moments into a
            visual memory that moves.
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
          <p className="eyebrow">How it works</p>
          <h2 id="process-title">A simple production arc.</h2>
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
          <p className="eyebrow light">Take the next step</p>
          <h2 id="contact-title">Bring the story. We will bring the cinema.</h2>
          <p>
            Based in {brand.location}. Available for commercial, event, wedding,
            and editorial work.
          </p>
          <CTAButton href={`mailto:${brand.email}`}>Start the conversation</CTAButton>
        </Reveal>
      </section>
    </main>
  );
}
