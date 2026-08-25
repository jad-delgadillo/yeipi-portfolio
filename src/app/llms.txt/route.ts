import { brand, selectedWorks } from "@/lib/site-content";
import { siteUrl } from "@/lib/site-config";

export const dynamic = "force-static";

export function GET() {
  const projects = selectedWorks
    .map(
      (project) =>
        `- [${project.title}](${siteUrl}/work/${project.slug}): ${project.category}. ${project.behindTheWork}`,
    )
    .join("\n");

  const content = `# el yeipi

> Películas y fotografía para personas, marcas, lugares y momentos que merecen más que documentación.

El Yeipi es un estudio de cine, fotografía y dirección visual con base en Guadalajara, México, disponible para proyectos en todo el mundo. El trabajo abarca historias de marca, eventos, contenido social, fotografía editorial, deportes y cine documental de boda.

## Sitio

- [Inicio](${siteUrl}): Presentación del estudio, enfoque creativo, clientes y selección de proyectos.
- [Sitemap](${siteUrl}/sitemap.xml): Índice de las páginas públicas del sitio.

## Proyectos seleccionados

${projects}

## Contacto

- [Correo](mailto:${brand.email}): ${brand.email}
- Ubicación: ${brand.location}
`;

  return new Response(content, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
