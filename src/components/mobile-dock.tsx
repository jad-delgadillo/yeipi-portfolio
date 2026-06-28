"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import { Menu } from "lucide-react";

type DockIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

function HomeSolid({ size = 24, ...props }: DockIconProps) {
  return (
    <svg aria-hidden="true" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d="M3.2 10.9c0-.76.34-1.48.93-1.96l6.3-5.18a2.48 2.48 0 0 1 3.14 0l6.3 5.18c.59.48.93 1.2.93 1.96v7.56A2.54 2.54 0 0 1 18.26 21h-3.12a1.08 1.08 0 0 1-1.08-1.08v-5.1a.82.82 0 0 0-.82-.82h-2.48a.82.82 0 0 0-.82.82v5.1A1.08 1.08 0 0 1 8.86 21H5.74a2.54 2.54 0 0 1-2.54-2.54z" />
    </svg>
  );
}

function SparkleSolid({ size = 24, ...props }: DockIconProps) {
  return (
    <svg aria-hidden="true" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d="M11.08 3.18a.96.96 0 0 1 1.84 0l1.2 4.04a3.8 3.8 0 0 0 2.56 2.56l4.04 1.2a.96.96 0 0 1 0 1.84l-4.04 1.2a3.8 3.8 0 0 0-2.56 2.56l-1.2 4.04a.96.96 0 0 1-1.84 0l-1.2-4.04a3.8 3.8 0 0 0-2.56-2.56l-4.04-1.2a.96.96 0 0 1 0-1.84l4.04-1.2a3.8 3.8 0 0 0 2.56-2.56z" />
      <path d="M18.8 2.7a.62.62 0 0 1 1.2 0l.38 1.28c.18.61.66 1.09 1.27 1.27l1.28.38a.62.62 0 0 1 0 1.2l-1.28.38c-.61.18-1.09.66-1.27 1.27L20 9.76a.62.62 0 0 1-1.2 0l-.38-1.28a1.9 1.9 0 0 0-1.27-1.27l-1.28-.38a.62.62 0 0 1 0-1.2l1.28-.38a1.9 1.9 0 0 0 1.27-1.27z" />
    </svg>
  );
}

function ApertureSolid({ size = 24, ...props }: DockIconProps) {
  return (
    <svg aria-hidden="true" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path
        d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm0 3.28 2.86 4.96H9.14zm-4.97 2.9h5.73l-2.86 4.96zm-.2 6.01 2.86-4.96 2.87 4.96zm5.17 4.03-2.86-4.96h5.72zm4.97-2.9h-5.73l2.86-4.96zm.2-6.01-2.86 4.96-2.87-4.96z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function ClapperSolid({ size = 24, ...props }: DockIconProps) {
  return (
    <svg aria-hidden="true" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d="M4.44 4.3 18.2 1.87a2.2 2.2 0 0 1 2.55 1.79l.24 1.38L6.02 7.68A2.2 2.2 0 0 1 3.47 5.9a1.36 1.36 0 0 1 .97-1.6Z" />
      <path d="M3 9.15h18v9.28A2.57 2.57 0 0 1 18.43 21H5.57A2.57 2.57 0 0 1 3 18.43zm3.6 0 2.7 3h3.05l-2.7-3zm6.35 0 2.7 3h3.05l-2.7-3z" />
    </svg>
  );
}

function ChatSolid({ size = 30, ...props }: DockIconProps) {
  return (
    <svg aria-hidden="true" height={size} viewBox="0 0 24 24" width={size} {...props}>
      <path d="M12 3.1c-5.1 0-9.25 3.6-9.25 8.05 0 2.45 1.28 4.68 3.3 6.17l-.78 2.88a.72.72 0 0 0 .98.84l3.62-1.58c.68.15 1.39.23 2.13.23 5.1 0 9.25-3.6 9.25-8.04S17.1 3.1 12 3.1Zm0 2.2c3.88 0 7.05 2.62 7.05 5.85S15.88 17 12 17c-.65 0-1.27-.08-1.86-.24l-.36-.1-1.62.7.32-1.2-.5-.36c-1.87-1.08-3.03-2.82-3.03-4.65C4.95 7.92 8.12 5.3 12 5.3Z" />
    </svg>
  );
}

const dockItems = [
  { label: "Inicio", href: "#top", icon: HomeSolid },
  { label: "Historia", href: "#story", icon: SparkleSolid },
  { label: "Proyectos", href: "#work", icon: ApertureSolid },
  { label: "Servicios", href: "#services", icon: ClapperSolid },
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
  const lastScrollYRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

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
    const updateHeroVisibility = () => {
      setIsHeroVisible(window.scrollY < window.innerHeight * 0.62);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;
      updateHeroVisibility();

      if (scrollDelta < 8) {
        return;
      }

      setIsExpanded(false);
    };

    updateHeroVisibility();
    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeroVisibility);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeroVisibility);
    };
  }, []);

  return (
    <nav
      className={[
        "mobile-dock",
        isHeroVisible ? "is-hero-hidden" : "",
        isExpanded ? "is-expanded" : "is-compact",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Navegación móvil"
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
        <button
          aria-expanded={isExpanded}
          aria-label="Abrir menú de navegación"
          className="dock-compact-trigger"
          onClick={() => setIsExpanded(true)}
          type="button"
        >
          <Menu aria-hidden="true" size={24} strokeWidth={2.3} />
          <span>Menú</span>
        </button>
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
          <ChatSolid size={30} />
        </a>
      </GlassSurface>
    </nav>
  );
}
