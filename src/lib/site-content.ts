import {
  Aperture,
  ArrowRight,
  BadgeCheck,
  Camera,
  Clapperboard,
  Film,
  Sparkles,
} from "lucide-react";

export const brand = {
  name: "El Yeipi",
  email: "hello@lumanorth.studio",
  location: "Guadalajara, MX / disponible en todo el mundo",
};

export const navItems = [
  { label: "Proyectos", href: "#work" },
  { label: "La historia", href: "#story" },
  { label: "Hablemos", href: "#contact" },
];

export const heroVideo = {
  src: "https://pub-d24c6b501d254fb2949ddc37e644d121.r2.dev/videos/HABANERO%20NEGRO%20-%207%20ANIVERSARIO.m4v",
  poster:
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=85",
};

export const heroFrames = [
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
    label: "Live energy",
  },
  {
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
    label: "Studio detail",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    label: "Place",
  },
  {
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
    label: "Portrait",
  },
];

export const proofLines = [
  "videos de lanzamiento",
  "historias de marca",
  "capítulos de boda",
  "aftermovies",
  "retratos íntimos",
  "mundos de producto",
];

export const projects = [
  {
    title: "La sala antes de abrir",
    category: "Video de evento",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Cada detalle tenía pulso",
    category: "Fotografía de marca",
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Una ciudad, dos personas, una promesa",
    category: "Cine de boda",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=85",
  },
];

export const services = [
  {
    title: "Cine",
    description:
      "Campañas, eventos, bodas e historias sociales construidas con ritmo, sonido y emoción.",
    icon: Film,
  },
  {
    title: "Fotografía",
    description:
      "Series editoriales para personas, lugares, productos y momentos que necesitan sentirse intencionales.",
    icon: Camera,
  },
  {
    title: "Dirección",
    description:
      "Concepto, planeación de tomas, locaciones y lenguaje visual antes de capturar el primer cuadro.",
    icon: Clapperboard,
  },
];

export const process = [
  {
    title: "Encontrar el punto de vista",
    text: "Empezamos entendiendo qué debe sentir, recordar y hacer después la audiencia.",
    icon: Aperture,
  },
  {
    title: "Construir la escena",
    text: "Diseñamos el ritmo: luz, movimiento, encuadre, agenda y esos detalles que sostienen la historia.",
    icon: Sparkles,
  },
  {
    title: "Entregar el corte",
    text: "Recibes piezas pulidas para web, redes, campañas o una sala llena de personas.",
    icon: BadgeCheck,
  },
];

export const ctaIcon = ArrowRight;
