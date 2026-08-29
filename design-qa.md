# Design QA — service mobile cards

## Source visual truth

- Surface reference: `/var/folders/mg/fwx93t25105fg6ty77t9376r0000gn/T/codex-clipboard-dfd98c97-5c88-47ea-b65d-b76f184a7b99.png` (646 × 1186 px).
- Structure reference: `/var/folders/mg/fwx93t25105fg6ty77t9376r0000gn/T/codex-clipboard-59678492-2429-4655-aa39-a07a4878a793.png` (722 × 428 px).
- Approved design direction: `audit/service-mobile-card-2026-08-28/audit.md`.

## Implementation evidence

- Full mobile viewport: `.codex-qa/service-mobile-card-2026-08-28/implementation-mobile-final.png`.
- Focused first card: `.codex-qa/service-mobile-card-2026-08-28/implementation-mobile-card-final.png`.
- Combined comparison: `.codex-qa/service-mobile-card-2026-08-28/comparison-final.png`.
- Browser viewport: 390 × 844 CSS px.
- Implementation screenshot: 390 × 844 px at device scale factor 1.
- State: services section, default card state.

## Full-view comparison evidence

The mobile section preserves the site's own heading and typography while adopting the references' compact dark-card rhythm. At 390 px, the first card is 200 px high and subsequent cards expand to approximately 217 px only where the real description requires a third line. Two cards remain substantially visible in one viewport.

## Focused comparison evidence

The three-up comparison normalizes both reference cards and the implementation to 362 × 200 px. It confirms the intended synthesis: the restrained corner lighting from the surface reference, the number/action structure from the structural reference, and Yeipi's coral accent without the generic SaaS grid.

## Required fidelity surfaces

- Fonts and typography: existing Instrument Sans is preserved; title weight, line height and wrapping remain consistent with the site. Descriptions remain readable without truncation.
- Spacing and layout rhythm: 22–26 px internal padding, 28 px radius, 12 px inter-card gap, and content-driven 200–217 px heights pass at 390 px.
- Colors and visual tokens: base `#131315` matches the section. White and coral corner lights remain subtle. `#FE5A3D` is limited to number and action hierarchy.
- Image quality and asset fidelity: no raster assets are required by this component. The existing Lucide action icon is preserved as the app's functional icon.
- Copy and content: all five production service titles and descriptions render completely.

## Interaction and engineering checks

- Primary action tested: tapping `Cotizar Contenido para tu negocio` navigates to `#contact`.
- Touch target: action remains 44 × 44 px.
- Browser console: no errors in the validated state.
- Production build: passed.

## Findings

- No actionable P0, P1 or P2 differences remain.
- P3: the coral lower-corner halo is intentionally near-invisible and may be tuned slightly after viewing on a physical OLED display.

## Comparison history

- Pass 1: no blocking mismatch. The implementation intentionally rejects the reference grid and oversized empty space, following the approved audit direction. No P0/P1/P2 fix iteration was required.

## Implementation checklist

- [x] Match section background.
- [x] Add restrained white and coral corner lighting.
- [x] Give number and action distinct visual hierarchy.
- [x] Keep cards compact across all five real descriptions.
- [x] Verify navigation, console, and production build.

final result: passed
