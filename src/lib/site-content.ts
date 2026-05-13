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
  name: "Yeipi",
  email: "hello@lumanorth.studio",
  location: "Guadalajara, MX / available worldwide",
};

export const navItems = [
  { label: "The Work", href: "#work" },
  { label: "The Story", href: "#story" },
  { label: "Start a Film", href: "#contact" },
];

export const heroVideo = {
  // This needs a direct delivery URL, for example:
  // https://res.cloudinary.com/dzepeibjw/video/upload/.../file.mp4
  // The current asset.cloudinary.com link is an Asset Share page, so the
  // browser cannot decode it as a video stream.
  src: "https://res.cloudinary.com/dzepeibjw/video/upload/v1778459937/yeipi/videos/nyc_pimqg9.mp4",
  poster:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=85",
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
  "launch films",
  "brand stories",
  "wedding chapters",
  "event aftermovies",
  "quiet portraits",
  "product worlds",
];

export const projects = [
  {
    title: "The Room Before It Opens",
    category: "Event Film",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Every Detail Had a Pulse",
    category: "Brand Photography",
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "A City, A Couple, A Promise",
    category: "Wedding Cinema",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=85",
  },
];

export const services = [
  {
    title: "Films",
    description:
      "Campaigns, events, weddings, and social stories shaped with pacing, sound, and feeling.",
    icon: Film,
  },
  {
    title: "Photography",
    description:
      "Editorial image sets for people, places, products, and moments that need to feel considered.",
    icon: Camera,
  },
  {
    title: "Direction",
    description:
      "Concept, shot planning, locations, and visual language before the first frame is captured.",
    icon: Clapperboard,
  },
];

export const process = [
  {
    title: "Find the point of view",
    text: "We start by understanding what the audience should feel, remember, and do next.",
    icon: Aperture,
  },
  {
    title: "Build the scene",
    text: "We design the rhythm: light, movement, framing, schedule, and the small moments that carry the story.",
    icon: Sparkles,
  },
  {
    title: "Deliver the cut",
    text: "You receive polished assets ready for web, social, campaigns, or a room full of people.",
    icon: BadgeCheck,
  },
];

export const ctaIcon = ArrowRight;
