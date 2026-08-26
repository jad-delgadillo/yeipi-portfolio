import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { brand } from "@/lib/site-content";

type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  date: string;
  category: string;
  duration: string;
  videoSrc: string;
  posterSrc: string;
  intention: string;
  work: { title: string; description: string }[];
  deliverables: string[];
  usage: string;
  links: { label: string; href: string }[];
  behindTheWork: string;
  technicalSpecs: string;
  btsImages: string[];
  credits: { role: string; name: string }[];
};

export function ProjectDetailClient({
  nextProject,
  project,
}: {
  nextProject: Project;
  project: Project;
}) {
  return (
    <main className="project-detail-page">
      <header className="project-detail-nav">
        <Link href="/#work" className="project-back-link">
          <ArrowLeft size={16} />
          Todos los proyectos
        </Link>
        <Link className="project-brand" href="/" aria-label="Ir al inicio">
          el yeipi
        </Link>
        <span className="project-release">PROYECTO {project.id}</span>
      </header>

      <section className="project-hero" aria-labelledby="project-title">
        <div className="project-hero-copy">
          <p className="project-kicker">{project.category}</p>
          <h1 id="project-title">{project.title}</h1>
          <div className="project-hero-meta">
            <span>{project.client}</span>
            <span>{project.date}</span>
            <span>{project.duration}</span>
          </div>
        </div>

        <div className="project-film-frame">
          <video
            src={project.videoSrc}
            poster={project.posterSrc}
            controls
            playsInline
            preload="metadata"
          />
          <div className="project-film-label" aria-hidden="true">
            <span>FILM PRINCIPAL</span>
            <span>{project.duration}</span>
          </div>
        </div>
      </section>

      <section className="project-story-shell">
        <div className="project-story-intro">
          <p className="project-section-label">El proyecto</p>
          <p className="project-context">{project.behindTheWork}</p>
        </div>

        <div className="project-intention">
          <p className="project-section-label">La intención</p>
          <h2>{project.intention}</h2>
        </div>

        <section className="project-work" aria-labelledby="project-work-title">
          <div className="project-section-heading">
            <p className="project-section-label">Lo que hicimos</p>
            <h2 id="project-work-title">Una producción construida de principio a fin.</h2>
          </div>
          <ol className="project-work-list">
            {project.work.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="project-deliverables" aria-labelledby="project-deliverables-title">
          <div>
            <p className="project-section-label">Entregables</p>
            <h2 id="project-deliverables-title">Piezas listas para vivir fuera del rodaje.</h2>
          </div>
          <ul>
            {project.deliverables.map((deliverable) => (
              <li key={deliverable}>
                <ArrowRight aria-hidden="true" size={18} />
                {deliverable}
              </li>
            ))}
          </ul>
          <a
            className="project-inline-cta"
            href={`mailto:${brand.email}?subject=Quiero producir algo parecido`}
          >
            Quiero producir algo parecido
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        </section>

        <div className="project-stills" aria-label="Fotogramas y proceso del proyecto">
          {project.btsImages.map((image, index) => (
            <div className="project-still" key={image}>
              <Image
                alt={`Imagen del proceso de ${project.title} ${index + 1}`}
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                src={image}
              />
            </div>
          ))}
        </div>

        <section className="project-usage" aria-labelledby="project-usage-title">
          <p className="project-section-label">Resultado y uso</p>
          <h2 id="project-usage-title">{project.usage}</h2>
          {project.links.length > 0 && (
            <div className="project-links">
              {project.links.map((link) => (
                <a href={link.href} key={link.label} rel="noopener noreferrer" target="_blank">
                  {link.label}
                  <ExternalLink aria-hidden="true" size={14} />
                </a>
              ))}
            </div>
          )}
        </section>

        <section className="project-credits" aria-labelledby="project-credits-title">
          <div>
            <p className="project-section-label">Créditos</p>
            <h2 id="project-credits-title">Las personas detrás de la pieza.</h2>
          </div>
          <dl>
            {project.credits.map((credit) => (
              <div key={`${credit.role}-${credit.name}`}>
                <dt>{credit.role}</dt>
                <dd>{credit.name}</dd>
              </div>
            ))}
          </dl>
          <details className="project-tech">
            <summary>Ficha técnica</summary>
            <p>{project.technicalSpecs}</p>
          </details>
        </section>
      </section>

      <section className="project-next" aria-labelledby="project-next-title">
        <Link href={`/work/${nextProject.slug}`}>
          <Image alt="" fill sizes="100vw" src={nextProject.posterSrc} />
          <span className="project-next-overlay" />
          <span className="project-next-copy">
            <span>Siguiente proyecto · {nextProject.id}</span>
            <strong id="project-next-title">{nextProject.title}</strong>
            <span className="project-next-action">
              Ver proyecto
              <ArrowRight aria-hidden="true" size={20} />
            </span>
          </span>
        </Link>
      </section>

      <section className="project-final-cta" aria-labelledby="project-cta-title">
        <div>
          <p className="project-section-label">Tu proyecto puede ser el siguiente</p>
          <h2 id="project-cta-title">¿Tienes una historia que merece verse así?</h2>
          <p>Cuéntanos qué quieres producir y para cuándo lo necesitas.</p>
          <a href={`mailto:${brand.email}?subject=Cuéntame tu proyecto`}>
            Cuéntame tu proyecto
            <ArrowRight aria-hidden="true" size={20} />
          </a>
        </div>
      </section>
    </main>
  );
}
