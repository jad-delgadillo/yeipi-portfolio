import { CTAButton } from "@/components/cta-button";
import { FooterParallax } from "@/components/footer-parallax";
import { Hero } from "@/components/hero";
import { LoadingExperience } from "@/components/loading-experience";
import { ProjectsCarousel } from "@/components/projects-carousel";
import { ProcessTimeline } from "@/components/process-timeline";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/text-reveal";
import { SelectedClients } from "@/components/selected-clients";
import { ServicesShowcase } from "@/components/services-showcase";
import { SiteFooter } from "@/components/site-footer";
import { StickySectionNav } from "@/components/sticky-section-nav";
import { WorksList } from "@/components/works-list";
import { StoryHud } from "@/components/story-hud";
import {
  brand,
  process,
  projects,
  services,
} from "@/lib/site-content";

export default function Home() {
  return (
    <main className="min-h-screen">
      <LoadingExperience />
      {/* <Nav /> */}
      <div className="main-content-wrapper">
        <div className="hero-story-container">
          <Hero />

          <section className="story-section-wrapper relative" id="story">
            <StoryHud />
            <div className="story-block flex-col md:flex! md:max-w-4xl! md:text-center" aria-labelledby="story-title">
              <div>
                <p className="eyebrow">La premisa</p>
                <TextReveal
                  text="La gente no conecta con más contenido. Conecta con historias que se sienten reales."
                  className="md:text-7xl! md:font-bold md:leading-[0.90]! leading-[1.05]!"
                  id="story-title"
                />
              </div>
              <Reveal delay={0.35}>
                <p className="story-copy md:text-sm! md:font-extralight!">
                  El verdadero arte de contar historias no está en la cámara, sino en encontrar el pulso de lo que sucede. Traducimos marcas, personas, celebraciones y lanzamientos en piezas de cine con un punto de vista definido. Imágenes diseñadas no solo para llenar una pantalla, sino para hacerte sentir que estuviste ahí.
                </p>
              </Reveal>
            </div>
          </section>
        </div>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <Reveal className="work-heading md:hidden">
            <p className="eyebrow light text-[#F9583C]! normal-case! text-lg! pb-4">En acción</p>
            <h2 id="work-title">Historias con pulso.</h2>
            <p>
              Cinco mundos de trabajo, nombrados para que el cliente entienda la
              intención antes de abrir el primer video.
            </p>
          </Reveal>
          <ProjectsCarousel projects={projects} />
          <WorksList />
        </section>

        <SelectedClients />

        <section className="services-section md:hidden" id="services" aria-labelledby="services-title">
          <Reveal className="services-intro">
            <p className="eyebrow text-[#F9583C]! normal-case! text-lg! pb-4">Lo que puedes pedir</p>
            <h2 id="services-title">
              Formatos claros para historias que necesitan sentirse vivas.
            </h2>
            <div className="py-10 font-extralight! text-neutral-400">
              <p>
                El trabajo puede tomar muchas formas, pero siempre parte de una
                intención concreta: presentar, documentar, lanzar, recordar o
                sostener presencia con una mirada cuidada.
              </p>
            </div>
          </Reveal>

          <ServicesShowcase services={services} />
        </section>
        <StickySectionNav />

        <section className="process-section" aria-labelledby="process-title">
          <Reveal className="handoff-intro pt-10">
            <p className="eyebrow">Antes de escribir</p>
            <h2 id="process-title">
              No necesitas tenerlo todo resuelto. Solo una historia que valga la pena mirar.
            </h2>
            <p>
              Podemos partir de una marca, una fecha, una idea suelta, un lugar o
              una emoción. El trabajo empieza encontrando qué debe sentirse, y
              después se construye la forma: ritmo, imagen, sonido y entrega.
            </p>
          </Reveal>
          <ProcessTimeline steps={process} />
        </section>

        <FooterParallax id="contact" labelledBy="contact-title">
          <Reveal>
            <p className="eyebrow light text-[#F9583C]! ">El siguiente plano</p>
            <h2 id="contact-title">Trae la historia. Nosotros ponemos el cine.</h2>
            <p>
              Con base en {brand.location}. Disponible para proyectos
              comerciales, eventos, bodas y trabajo editorial.
            </p>
            <CTAButton href={`mailto:${brand.email}`}>Empecemos la conversación</CTAButton>
          </Reveal>
        </FooterParallax>
      </div>

      <SiteFooter />
    </main>
  );
}
