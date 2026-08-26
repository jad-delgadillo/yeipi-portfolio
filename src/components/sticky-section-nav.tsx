export function StickySectionNav() {
  return (
    <div className="sticky-section-nav-wrap" aria-label="Navegación principal">
      <nav className="sticky-section-nav">
        <a className="sticky-section-brand" href="#top" aria-label="Ir al inicio">
          el yeipi
        </a>
        <div className="sticky-section-actions">
          {/* <a className="sticky-section-link" href="#work">
            Proyectos
          </a> */}
          <a className="sticky-section-link sticky-section-services-link" href="#services">
            Servicios
          </a>
          <a className="sticky-section-cta" href="#contact">
            Hablemos
          </a>
        </div>
      </nav>
    </div>
  );
}
