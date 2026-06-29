import { selectedWorks } from "@/lib/site-content";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "./project-detail-client";

export function generateStaticParams() {
  return selectedWorks.map((work) => ({
    slug: work.slug,
  }));
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

  return <ProjectDetailClient project={project} />;
}
