"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";

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
  links: { label: string; href: string }[];
  behindTheWork: string;
  technicalSpecs: string;
  btsImages: string[];
  credits: { role: string; name: string }[];
};

export function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <div className="project-detail-page bg-[#131315] min-h-screen text-white pb-24">
      {/* Navigation Header */}
      <header className="project-detail-nav max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
        <Link
          href="/#work"
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Volver a Proyectos
        </Link>
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">RELEASE {project.id}</span>
      </header>

      {/* Main Hero Header */}
      <main className="max-w-6xl mx-auto px-6">
        <div className="project-detail-hero-info flex flex-col md:flex-row gap-6 md:items-end justify-between mb-10">
          <div className="flex gap-4 items-center">
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
              <Image
                src={project.posterSrc}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 64px, 80px"
              />
            </div>
            <div>
              <span className="text-xs text-neutral-400 font-light uppercase tracking-wider">{project.client}</span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none mt-1">{project.title}</h1>
            </div>
          </div>

          {/* Quick external links */}
          <div className="flex gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/5 transition rounded-full px-4 py-2 text-xs text-white"
              >
                {link.label}
                <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </div>

        {/* Video Player */}
        <section className="project-detail-video-container mb-8">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
            <video
              src={project.videoSrc}
              poster={project.posterSrc}
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Video Metadata Footer */}
        <section className="project-detail-meta-row grid grid-cols-3 border-t border-b border-white/10 py-6 mb-12 text-center md:text-left gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest">TIPO DE PROYECTO</span>
            <span className="text-sm font-semibold text-neutral-200">{project.category}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest">FECHA DE LANZAMIENTO</span>
            <span className="text-sm font-semibold text-neutral-200">{project.date}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest">DURACIÓN TOTAL</span>
            <span className="text-sm font-semibold text-neutral-200">{project.duration}</span>
          </div>
        </section>

        {/* Details Grid */}
        <section className="project-detail-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Behind the Film */}
          <div className="detail-card bg-neutral-900/50 border border-white/5 rounded-3xl p-6 md:p-8">
            <h3 className="detail-card-title text-xs text-neutral-500 uppercase tracking-widest mb-4">DETRÁS DE CÁMARAS</h3>
            <p className="font-mono text-sm leading-relaxed text-neutral-300 whitespace-pre-line">
              {project.behindTheWork}
            </p>
          </div>

          {/* Card 2: Specs & Gear */}
          <div className="detail-card bg-neutral-900/50 border border-white/5 rounded-3xl p-6 md:p-8">
            <h3 className="detail-card-title text-xs text-neutral-500 uppercase tracking-widest mb-4">ESPECIFICACIONES TÉCNICAS</h3>
            <p className="font-mono text-sm leading-relaxed text-neutral-300 whitespace-pre-line">
              {project.technicalSpecs}
            </p>
          </div>

          {/* Card 3: The Making Of (Polaroid Stack) */}
          <div className="detail-card bg-neutral-900/50 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden min-h-[300px]">
            <h3 className="detail-card-title text-xs text-neutral-500 uppercase tracking-widest mb-4">THE MAKING OF</h3>
            
            <div className="polaroid-stack-container my-auto">
              {project.btsImages.map((img, i) => (
                <div key={i} className={`polaroid-card polaroid-card-${i}`}>
                  <div className="polaroid-image-wrapper">
                    <Image
                      src={img}
                      alt="Behind the scenes"
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  <div className="polaroid-caption font-mono text-[9px] text-neutral-500 mt-2 text-center">
                    BTS #0{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Credits */}
          <div className="detail-card bg-neutral-900/50 border border-white/5 rounded-3xl p-6 md:p-8">
            <h3 className="detail-card-title text-xs text-neutral-500 uppercase tracking-widest mb-4">CRÉDITOS DEL PROYECTO</h3>
            <div className="credits-list flex flex-col gap-3">
              {project.credits.map((credit, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider">{credit.role}</span>
                  <span className="text-sm font-semibold text-neutral-200">{credit.name}</span>
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
