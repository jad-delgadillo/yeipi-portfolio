import type React from "react";

type CTAButtonProps = {
  children: React.ReactNode;
  href: string;
};

export function CTAButton({ children, href }: CTAButtonProps) {
  return (
    <a className="cta-button" href={href}>
      <span>{children}</span>
      {/* <span className="cta-icon" aria-hidden="true">
        <ArrowRight size={18} strokeWidth={2.1} />
      </span> */}
    </a>
  );
}
