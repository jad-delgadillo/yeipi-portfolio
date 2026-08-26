import { Mail } from "lucide-react";
import { brand } from "@/lib/site-content";

const footerGroups = [
  {
    title: "Trabajo",
    links: [
      { label: "Proyectos", href: "#work" },
      { label: "Marcas", href: "#work" },
      { label: "Lo que puedes pedir", href: "#services" },
      { label: "Cómo trabajamos", href: "#process" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "Contenido para negocios", href: "#services" },
      { label: "Eventos y experiencias", href: "#services" },
      { label: "Contenido recurrente", href: "#services" },
      { label: "Bodas documentales", href: "#services" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: brand.email, href: `mailto:${brand.email}` },
      { label: "Guadalajara, MX", href: "#contact" },
      { label: "Disponible para viajar", href: "#contact" },
    ],
  },
  {
    title: "Conecta",
    links: [
      { label: "Empecemos", href: `mailto:${brand.email}` },
      { label: "Ver proyectos", href: "#work" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-labelledby="site-footer-title">
      <div className="site-footer-inner">
        <div className="site-footer-rule" />
        <a className="site-footer-brand" href="#top" id="site-footer-title">
          el yeipi
        </a>

        <div className="site-footer-grid">
          {footerGroups.map((group) => (
            <nav aria-label={group.title} className="site-footer-group" key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map((link) => (
                <a href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="site-footer-bottom">
          <p>© 2026 {brand.name}. Cine, fotografía y dirección visual.</p>
          <nav aria-label="For agents" className="site-footer-agents">
            <span>For agents</span>
            <a href="/llms.txt">LLMs.txt</a>
            <a href="/sitemap.xml">Sitemap</a>
          </nav>
          <a href={`mailto:${brand.email}`}>
            <Mail aria-hidden="true" size={18} strokeWidth={2.2} />
            {brand.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
