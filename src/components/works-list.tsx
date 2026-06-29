"use client";

import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { useMemo, useState } from "react";
import { projects, selectedWorks } from "@/lib/site-content";

const ALL_FILTER = "Todos";

export function WorksList() {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);
  const filters = useMemo(
    () => [
      {
        label: ALL_FILTER,
        count: selectedWorks.length,
      },
      ...projects.map((project) => ({
        label: project.title,
        count: selectedWorks.filter((work) => work.projectType === project.title).length,
      })),
    ],
    [],
  );
  const filteredWorks = useMemo(
    () =>
      activeFilter === ALL_FILTER
        ? selectedWorks
        : selectedWorks.filter((work) => work.projectType === activeFilter),
    [activeFilter],
  );

  return (
    <section className="works-list-section" aria-labelledby="works-list-title">
      <div className="works-list-shell">
        <div className="works-list-header">
          <div className="works-list-title-row">
            <div className="flex flex-col gap-1 justfy-start items-start">
              <p className="eyebrow light text-[#F9583C]! capitalize! text-lg!">Historial</p>
              <h2 id="works-list-title" className="text-2xl md:text-3xl font-semibold text-white">Todos los proyectos</h2>
            </div>
            {/* <span className="works-list-meta-top text-xs text-neutral-400 uppercase tracking-widest hidden md:block">ORDENADOS POR RECIENTE</span> */}
          </div>

          <div className="works-filter" aria-label="Filtrar proyectos por categoria">
            {filters.map((filter, index) => {
              const isActive = activeFilter === filter.label;
              const filterNumber = String(index).padStart(2, "0");

              return (
                <button
                  aria-pressed={isActive}
                  className={`works-filter-chip ${isActive ? "is-active" : ""}`}
                  key={filter.label}
                  onClick={() => setActiveFilter(filter.label)}
                  type="button"
                >
                  <span className="works-filter-index">{filterNumber}</span>
                  <span className="works-filter-label">{filter.label}</span>
                  <span className="works-filter-count">{filter.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="works-list-container">
          {filteredWorks.map((work) => (
            <Link
              href={`/work/${work.slug}`}
              key={work.id}
              className="work-row-link"
            >
              <article className="work-row">
                <span className="work-row-id font-mono text-sm text-neutral-500">{work.id}</span>
                
                <div className="work-row-thumbnail-container">
                  <Image
                    src={work.posterSrc}
                    alt=""
                    fill
                    sizes="80px"
                    className="work-row-thumbnail object-cover"
                  />
                </div>

                <div className="work-row-title-container">
                  <h3 className="work-row-title font-bold text-white text-base md:text-lg">{work.title}</h3>
                  <span className="work-row-client text-xs text-neutral-400 font-light">{work.client}</span>
                </div>

                <span className="work-row-date hidden md:block text-xs text-neutral-400 uppercase tracking-wider">{work.date}</span>
                <span className="work-row-category hidden md:block text-xs text-neutral-400 uppercase tracking-wider">{work.category}</span>
                <span className="work-row-duration hidden md:block text-xs text-neutral-400 uppercase tracking-wider">{work.duration}</span>

                <div className="work-row-action">
                  <span className="work-row-action-btn flex items-center gap-2 bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20 transition rounded-full px-4 py-2 text-xs text-white font-medium">
                    <Play size={12} fill="currentColor" />
                    PREPLAY
                  </span>
                </div>
              </article>
            </Link>
          ))}
          {filteredWorks.length === 0 && (
            <p className="works-list-empty">No hay proyectos en esta categoria todavia.</p>
          )}
        </div>
      </div>
    </section>
  );
}
