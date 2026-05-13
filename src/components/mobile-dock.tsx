"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type React from "react";
import { Aperture, Clapperboard, Home, MessageCircle, Sparkles } from "lucide-react";

const dockItems = [
  { label: "Inicio", href: "#top", icon: Home },
  { label: "Historia", href: "#story", icon: Sparkles },
  { label: "Work", href: "#work", icon: Aperture },
  { label: "Servicios", href: "#services", icon: Clapperboard },
];

type GlassFilterConfig = {
  chromaticAberration?: number;
  depth: number;
  height: number;
  radius: number;
  strength: number;
  width: number;
};

function getDisplacementMap({ height, width, radius, depth }: GlassFilterConfig) {
  const yStart = Math.ceil((radius / height) * 15);
  const yEnd = Math.floor(100 - (radius / height) * 15);
  const xStart = Math.ceil((radius / width) * 15);
  const xEnd = Math.floor(100 - (radius / width) * 15);

  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>.mix{mix-blend-mode:screen;}</style>
      <defs>
        <linearGradient id="Y" x1="0" x2="0" y1="${yStart}%" y2="${yEnd}%">
          <stop offset="0%" stop-color="#0F0" />
          <stop offset="100%" stop-color="#000" />
        </linearGradient>
        <linearGradient id="X" x1="${xStart}%" x2="${xEnd}%" y1="0" y2="0">
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
    </svg>
  `)}`;
}

function getDisplacementFilter({
  chromaticAberration = 0,
  depth,
  height,
  radius,
  strength,
  width,
}: GlassFilterConfig) {
  const displacementMap = getDisplacementMap({
    depth,
    height,
    radius,
    strength,
    width,
  });

  return `url("data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="displace" color-interpolation-filters="sRGB">
          <feImage x="0" y="0" height="${height}" width="${width}" href="${displacementMap}" result="displacementMap" />
          <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength + chromaticAberration * 2}" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedR" />
          <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength + chromaticAberration}" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedG" />
          <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength}" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="displacedB" />
          <feBlend in="displacedR" in2="displacedG" mode="screen" />
          <feBlend in2="displacedB" mode="screen" />
        </filter>
      </defs>
    </svg>
  `)}#displace")`;
}

function useLiquidGlassFilter(
  radius: number,
  depth: number,
  strength: number,
  chromaticAberration = 0,
) {
  const ref = useRef<HTMLDivElement | HTMLAnchorElement>(null);
  const [size, setSize] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const updateSize = () => {
      const rect = node.getBoundingClientRect();
      setSize({
        height: Math.round(rect.height),
        width: Math.round(rect.width),
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const filter = useMemo(() => {
    if (!size.height || !size.width) return "blur(22px) saturate(185%)";

    return `blur(0.5px) ${getDisplacementFilter({
      chromaticAberration,
      depth,
      height: size.height,
      radius,
      strength,
      width: size.width,
    })} blur(7px) brightness(1.08) saturate(1.55)`;
  }, [chromaticAberration, depth, radius, size.height, size.width, strength]);

  return [ref, filter] as const;
}

export function MobileDock() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dockRef, dockFilter] = useLiquidGlassFilter(30, 9, 76, 1.2);
  const [actionRef, actionFilter] = useLiquidGlassFilter(34, 8, 70, 1.6);

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

  return (
    <nav
      className="mobile-dock"
      aria-label="Mobile navigation"
      style={
        {
          "--active-index": activeIndex,
          "--action-liquid-filter": actionFilter,
          "--dock-liquid-filter": dockFilter,
        } as React.CSSProperties
      }
    >
      <div className="dock-glass" ref={dockRef as React.RefObject<HTMLDivElement>}>
        <div className="dock-filter" />
        <div className="dock-tint" />
        <div className="dock-specular" />
        <div className="dock-indicator" />
        <div className="dock-items">
          {dockItems.map((item) => (
            <a
              className={dockItems[activeIndex]?.href === item.href ? "dock-item active" : "dock-item"}
              href={item.href}
              key={item.href}
            >
              <item.icon aria-hidden="true" size={24} strokeWidth={2.2} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
      <a
        className="dock-action"
        href="#contact"
        aria-label="Contactar"
        ref={actionRef as React.RefObject<HTMLAnchorElement>}
      >
        <span className="dock-action-filter" />
        <span className="dock-action-tint" />
        <span className="dock-action-specular" />
        <MessageCircle aria-hidden="true" size={30} strokeWidth={2.3} />
      </a>
    </nav>
  );
}
