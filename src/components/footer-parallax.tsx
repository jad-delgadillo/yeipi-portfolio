import type React from "react";

type FooterParallaxProps = {
  children: React.ReactNode;
  id: string;
  labelledBy: string;
};

export function FooterParallax({
  children,
  id,
  labelledBy,
}: FooterParallaxProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className="contact-section"
      id={id}
    >
      <video
        aria-hidden="true"
        autoPlay
        className="contact-bg-video"
        loop
        muted
        playsInline
        preload="metadata"
        src="https://pub-d24c6b501d254fb2949ddc37e644d121.r2.dev/website/blob.mp4"
      />
      <div className="contact-bg-scrim" aria-hidden="true" />
      <div className="contact-content">{children}</div>
    </section>
  );
}
