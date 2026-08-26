import { ContactCta } from "@/components/contact-cta";
import { Hero } from "@/components/hero";
import { LoadingExperience } from "@/components/loading-experience";
import { ProjectsCarousel } from "@/components/projects-carousel";
import { ProcessTimeline } from "@/components/process-timeline";
import { Reveal } from "@/components/reveal";
import { ServicesSection } from "@/components/services-section";
import { TextReveal } from "@/components/text-reveal";
import { SelectedClients } from "@/components/selected-clients";
import { SiteFooter } from "@/components/site-footer";
import { StickySectionNav } from "@/components/sticky-section-nav";
import { WorksList } from "@/components/works-list";
import { process, projects } from "@/lib/site-content";

export default function Home() {
  return (
    <main className="min-h-screen">
      <LoadingExperience />
      {/* <Nav /> */}
      <div className="main-content-wrapper">
        <div className="hero-story-container">
          <Hero />

          <section className="story-section-wrapper relative" id="story">
            <div className="story-block flex-col md:flex! md:max-w-4xl! md:text-center" aria-labelledby="story-title">
              <div>
                <p className="eyebrow">La mirada</p>
                <TextReveal
                  text="Historias que se sienten."
                  className="md:text-7xl! md:font-bold font-medium md:leading-[0.90]! leading-[0.90]!"
                  id="story-title"
                />
              </div>
              <Reveal delay={0.35}>
                <p className="story-copy md:text-sm! md:font-extralight!">
                  Personas, movimiento, lugares y pequeños momentos que hacen
                  que una marca tenga personalidad. El objetivo no es mostrar
                  más, sino hacer que alguien quiera estar ahí.
                </p>
              </Reveal>
            </div>
          </section>
        </div>

        <SelectedClients />

        <section className="work-section" id="work" aria-labelledby="work-title">
          <Reveal className="work-heading md:hidden">
            <p className="eyebrow light text-[#F9583C]! normal-case! text-lg! pb-4">En acción</p>
            <h2 id="work-title">Historias con pulso.</h2>
            <p>
              Negocios, comunidades y experiencias distintas, contadas desde
              una mirada cercana y cinematográfica.
            </p>
          </Reveal>
          <ProjectsCarousel projects={projects} />
          <WorksList />
        </section>

        <ServicesSection />

        <section className="process-section" id="process" aria-labelledby="process-title">
          <StickySectionNav />
          <Reveal className="handoff-intro pt-10">
            <p className="eyebrow">Cómo trabajamos</p>
            <h2 id="process-title">
              De una idea suelta a una pieza lista para publicar.
            </h2>
            <p>
              Tú conoces tu negocio. Yo te ayudo a encontrar qué vale la pena
              contar y me encargo de convertirlo en contenido.
            </p>
          </Reveal>
          <ProcessTimeline steps={process} />
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="about-shell">
            <Reveal className="about-heading">
              <p className="eyebrow">Por qué Yeipi</p>
              <TextReveal
                id="about-title"
                text="No busco solamente grabar lo que haces."
              />
            </Reveal>

            <Reveal className="about-body" delay={0.18}>
              <p>
                Me interesa encontrar esos momentos que hacen que un lugar,
                una comunidad o una experiencia se sienta especial. La cámara
                se acerca a la acción sin quitarle verdad.
              </p>
              <div className="about-signals" aria-label="Rasgos de la mirada de Yeipi">
                <span>Movimiento</span>
                <span>Personas</span>
                <span>Espacios</span>
                <span>Momentos reales</span>
              </div>
            </Reveal>
          </div>
        </section>

        <ContactCta />
      </div>

      <SiteFooter />
    </main>
  );
}
