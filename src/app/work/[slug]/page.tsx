import type { Metadata } from "next";
import { selectedWorks } from "@/lib/site-content";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "./project-detail-client";

export function generateStaticParams() {
  return selectedWorks.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = selectedWorks.find((work) => work.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} — el yeipi`,
    description: project.behindTheWork,
    openGraph: {
      description: project.behindTheWork,
      images: [project.posterSrc],
      title: `${project.title} — el yeipi`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = selectedWorks.find((w) => w.slug === slug);

  if (!project) {
    notFound();
  }

  const projectIndex = selectedWorks.findIndex((work) => work.slug === slug);
  const nextProject = selectedWorks[(projectIndex + 1) % selectedWorks.length];

  return <ProjectDetailClient nextProject={nextProject} project={project} />;
}
