import { CTAButton } from "@/components/cta-button";
import { brand, navItems } from "@/lib/site-content";

export function Nav() {
  return (
    <header className="site-nav">
      <a className="brand-mark" href="#top" aria-label={`${brand.name} home`}>
        {brand.name}
      </a>
      <nav aria-label="Primary navigation">
        {navItems.slice(0, 2).map((item) => (
          <a className="nav-link" href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <CTAButton href="#contact">{navItems[2].label}</CTAButton>
      </nav>
    </header>
  );
}
