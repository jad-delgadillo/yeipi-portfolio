"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import { Aperture, Clapperboard, Home, MessageCircle, Sparkles } from "lucide-react";

const dockItems = [
  { label: "Inicio", href: "#top", icon: Home },
  { label: "Historia", href: "#story", icon: Sparkles },
  { label: "Proyectos", href: "#work", icon: Aperture },
  { label: "Servicios", href: "#services", icon: Clapperboard },
];

type GlassFilterOptions = {
  height: number;
  width: number;
  radius: number;
  depth: number;
  strength?: number;
  chromaticAberration?: number;
};

const getDisplacementMap = ({ height, width, radius, depth }: GlassFilterOptions) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .mix { mix-blend-mode: screen; }
    </style>
    <defs>
      <linearGradient
        id="Y"
        x1="0"
        x2="0"
        y1="${Math.ceil((radius / height) * 15)}%"
        y2="${Math.floor(100 - (radius / height) * 15)}%">
        <stop offset="0%" stop-color="#0F0" />
        <stop offset="100%" stop-color="#000" />
      </linearGradient>
      <linearGradient
        id="X"
        x1="${Math.ceil((radius / width) * 15)}%"
        x2="${Math.floor(100 - (radius / width) * 15)}%"
        y1="0"
        y2="0">
        <stop offset="0%" stop-color="#F00" />
        <stop offset="100%" stop-color="#000" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" height="${height}" width="${width}" fill="#808080" />
    <g filter="blur(1px)">
      <rect x="0" y="0" height="${height}" width="${width}" fill="#000080" />
      <rect x="0" y="0" height="${height}" width="${width}" fill="url(#Y)" class="mix" />
      <rect x="0" y="0" height="${height}" width="${width}" fill="url(#X)" class="mix" />
      <rect
        x="${depth}"
        y="${depth}"
        height="${height - 2 * depth}"
        width="${width - 2 * depth}"
        fill="#808080"
        rx="${radius}"
        ry="${radius}"
        filter="blur(${depth}px)"
      />
    </g>
  </svg>`);

const getDisplacementFilter = ({
  height,
  width,
  radius,
  depth,
  strength = 100,
  chromaticAberration = 0,
}: GlassFilterOptions) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="displace" color-interpolation-filters="sRGB">
        <feImage x="0" y="0" height="${height}" width="${width}" href="${getDisplacementMap({
          height,
          width,
          radius,
          depth,
        })}" result="displacementMap" />
        <feDisplacementMap
          transform-origin="center"
          in="SourceGraphic"
          in2="displacementMap"
          scale="${strength + chromaticAberration * 2}"
          xChannelSelector="R"
          yChannelSelector="G"
        />
        <feColorMatrix
          type="matrix"
          values="1 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 1 0"
          result="displacedR"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="displacementMap"
          scale="${strength + chromaticAberration}"
          xChannelSelector="R"
          yChannelSelector="G"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0
                  0 1 0 0 0
                  0 0 0 0 0
                  0 0 0 1 0"
          result="displacedG"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="displacementMap"
          scale="${strength}"
          xChannelSelector="R"
          yChannelSelector="G"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 1 0 0
                  0 0 0 1 0"
          result="displacedB"
        />
        <feBlend in="displacedR" in2="displacedG" mode="screen" />
        <feBlend in2="displacedB" mode="screen" />
      </filter>
    </defs>
  </svg>`) +
  "#displace";

type GlassSurfaceProps = {
  children: React.ReactNode;
  className: string;
  radius: number;
  depth: number;
  blur?: number;
  strength?: number;
  chromaticAberration?: number;
  style?: React.CSSProperties;
};

function GlassSurface({
  children,
  className,
  radius,
  depth: baseDepth,
  blur = 2,
  strength = 100,
  chromaticAberration = 0,
  style,
}: GlassSurfaceProps) {
  const ref = useRef<HTMLDivElement | HTMLAnchorElement>(null);
  const [filter, setFilter] = useState(`blur(${blur}px) brightness(1.1) saturate(1.5)`);

  useEffect(() => {
    const updateFilter = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const height = Math.round(rect.height);
      const width = Math.round(rect.width);
      if (!height || !width) return;

      setFilter(
        `blur(${blur / 2}px) url('${getDisplacementFilter({
          height,
          width,
          radius,
          depth: baseDepth,
          strength,
          chromaticAberration,
        })}') blur(${blur}px) brightness(1.1) saturate(1.5)`
      );
    };

    updateFilter();
    const observer = new ResizeObserver(updateFilter);
    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [baseDepth, blur, chromaticAberration, radius, strength]);

  return (
    <div
      className={className}
      ref={ref as React.RefObject<HTMLDivElement>}
      style={
        {
          ...style,
          "--glass-filter": filter,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function MobileDock() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDockVisible, setIsDockVisible] = useState(false);

  useEffect(() => {
    const syncActiveItem = () => {
      const hash = window.location.hash || "#top";
      const index = dockItems.findIndex((item) => item.href === hash);
      setActiveIndex(index >= 0 ? index : 0);
    };

    syncActiveItem();
    window.addEventListener("hashchange", syncActiveItem);

    return () => window.removeEventListener("hashchange", syncActiveItem);
  }, []);

  useEffect(() => {
    const syncDockVisibility = () => {
      setIsDockVisible(window.scrollY > Math.min(180, window.innerHeight * 0.18));
    };

    syncDockVisibility();
    window.addEventListener("scroll", syncDockVisibility, { passive: true });
    window.addEventListener("resize", syncDockVisibility);

    return () => {
      window.removeEventListener("scroll", syncDockVisibility);
      window.removeEventListener("resize", syncDockVisibility);
    };
  }, []);

  return (
    <nav
      className={isDockVisible ? "mobile-dock is-visible" : "mobile-dock"}
      aria-label="Navegación móvil"
      aria-hidden={!isDockVisible}
      style={{ "--active-index": activeIndex } as React.CSSProperties}
    >
      <GlassSurface
        className="dock-glass"
        radius={32}
        depth={10}
        blur={1}
        strength={100}
        chromaticAberration={5}
      >
        <div className="dock-indicator" />
        <div className="dock-items">
          {dockItems.map((item) => (
            <a
              className={dockItems[activeIndex]?.href === item.href ? "dock-item active" : "dock-item"}
              href={item.href}
              key={item.href}
            >
              <item.icon aria-hidden="true" size={24} strokeWidth={2.25} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </GlassSurface>

      <GlassSurface
        className="dock-action"
        radius={38}
        depth={10}
        blur={1}
        strength={100}
        chromaticAberration={0}
      >
        <a href="#contact" aria-label="Contactar">
          <MessageCircle aria-hidden="true" size={30} strokeWidth={2.35} />
        </a>
      </GlassSurface>
    </nav>
  );
}
