# El Yeipi Portfolio - Scope of Work and Launch Review

Last reviewed: June 22, 2026

## Executive Summary

The portfolio is close to a client-ready delivery. The current build is a polished one-page cinematic portfolio for El Yeipi, with a strong visual concept, real project categories, branded proof points, services, process copy, and a clear contact CTA.

Technically, the production build passes. The remaining work is not a rebuild; it is final launch polish, content approval, QA, and deployment handoff. This is a good moment to schedule the client meeting, as long as the meeting is framed as a final review and launch-lock session rather than an early concept presentation.

## Project Goal

Deliver a premium portfolio landing page for El Yeipi that positions the client as a cinematic photo/video creator for brands, events, weddings, editorial work, and social content.

The site should help visitors quickly understand:

- who El Yeipi is;
- what kind of work is offered;
- what categories of projects are available;
- which brands or clients add credibility;
- how the visual style feels;
- how to start a conversation.

## Current Scope

### Included Pages

- Single-page portfolio landing page at `/`.
- Static metadata for search and social sharing.
- Responsive layout for desktop and mobile.

### Included Sections

- Loading / entry experience.
- Hero with cinematic video background.
- Main navigation.
- Story / positioning section.
- Brand logo marquee.
- Project carousel with five work categories.
- Selected client mosaic.
- Services showcase.
- Process / approach timeline.
- Contact section.
- Site footer.

### Included Content Areas

- Brand name: El Yeipi.
- Location: Guadalajara, MX / available worldwide.
- Project categories:
  - Restaurantes y bares.
  - Editorial.
  - Sports.
  - Historias de marca.
  - Bodas.
- Service categories:
  - Historias de marca.
  - Eventos con memoria.
  - Contenido social.
  - Foto editorial.
  - Bodas documentales.
- Brand/client proof:
  - Adidas.
  - Porsche.
  - Blackbox.
  - Commando.
  - Electrolit.

## Technical Review

### Build Status

`npm run build` passes successfully.

Current production route output:

- `/` is statically prerendered.
- First load JS is approximately 160 kB.
- No TypeScript build errors.
- No blocking production build errors.

### Lint Status

`npm run lint` runs, but Next.js reports that `next lint` is deprecated and should eventually migrate to the ESLint CLI.

Current warnings:

- `src/components/hero.tsx` imports `BadgeCheck` but does not use it.
- `src/components/hero.tsx` imports `MessageCircle` but does not use it.
- `src/components/hero.tsx` imports `brand` but does not use it.

These warnings are low-risk and easy to clean before launch.

### Asset Status

The expected local public assets are present:

- `public/images/og.jpg`
- `public/images/brands/adidas-21.svg`
- `public/images/brands/porsche-3.svg`
- `public/images/brands/blackbox-white.png`
- `public/images/brands/commando-brand-white.png`
- `public/images/brands/Footer-Logo-New.svg`

Remote media is loaded from the configured Cloudflare R2 host:

- `pub-d24c6b501d254fb2949ddc37e644d121.r2.dev`

The R2 host is already allowed in `next.config.ts`.

## Launch Readiness

### Ready

- Site architecture is in place.
- Core content flow is coherent.
- Visual direction is strong and differentiated.
- Real project media appears wired into the site.
- Client/brand proof section exists.
- Contact CTA exists.
- Production build passes.
- OG image file exists.

### Needs Final Approval

- Final contact email. The current email is `hello@lumanorth.studio`, which may be a placeholder or studio email rather than the client's preferred contact.
- Final live domain. Metadata currently points to `https://yeipi.vercel.app`.
- Final client/brand list and permissions to show logos.
- Final project names and category labels.
- Final Spanish copy.
- Whether English content is needed now or can wait.
- Whether social links, WhatsApp, Instagram, or booking links should be added.

### Recommended Pre-Launch Fixes

1. Remove unused imports in `src/components/hero.tsx`.
2. Confirm or replace the contact email.
3. Confirm final deployment domain and update metadata if needed.
4. QA the site on mobile Safari, mobile Chrome, desktop Chrome, and desktop Safari.
5. Verify all remote videos load quickly enough on mobile data.
6. Check that the loader experience feels intentional and does not block impatient visitors for too long.
7. Confirm that every shown brand logo is approved for portfolio use.
8. Decide whether the unused `MobileDock` component should be connected or removed from scope.
9. Migrate `npm run lint` away from deprecated `next lint` when convenient.

## Suggested Client Meeting Agenda

Use the meeting to turn the current build into a launch-approved site.

### 1. Positioning

Confirm that the site should present El Yeipi as:

- cinematic;
- emotional but commercial;
- available for brands, events, weddings, editorial, and social content;
- based in Guadalajara with travel availability.

### 2. Work Categories

Review the five current project worlds:

- Restaurantes y bares.
- Editorial.
- Sports.
- Historias de marca.
- Bodas.

Decision needed: Are these the exact categories the client wants to sell?

### 3. Proof and Credibility

Review the displayed brands:

- Adidas.
- Porsche.
- Blackbox.
- Commando.
- Electrolit.

Decision needed: Are all logos approved to show publicly?

### 4. Contact Flow

Confirm the primary CTA destination:

- email;
- WhatsApp;
- Instagram DM;
- booking form;
- a combination of the above.

Decision needed: What should happen when someone clicks "Empecemos la conversación"?

### 5. Launch Details

Confirm:

- final domain;
- final contact email;
- final social preview image;
- analytics requirement;
- deadline for final copy feedback;
- launch date.

## Proposed Final Delivery Scope

### Deliverables

- Production-ready one-page portfolio.
- Responsive desktop and mobile layouts.
- Project carousel with supplied media.
- Brand proof section.
- Services and process sections.
- Contact CTA.
- SEO/social metadata.
- Deployment-ready Next.js project.

### Out of Scope Unless Added

- Multi-page CMS.
- Blog or journal.
- Admin dashboard.
- Online payments.
- Booking calendar integration.
- Full bilingual site.
- Custom analytics dashboard.
- Ongoing content uploads after launch.

## Acceptance Criteria

The project can be considered ready to deliver when:

- `npm run build` passes.
- There are no launch-blocking lint warnings.
- Final email/contact method is approved.
- Final domain is configured.
- All videos and images load on desktop and mobile.
- All brand logos are approved for use.
- Client approves the Spanish copy.
- Social preview image and metadata are verified.
- The site has been checked on at least one mobile and one desktop browser.

## Recommendation

Yes, the project is pretty close.

The right next move is to schedule the client meeting as a final review. The meeting should focus on approvals and launch decisions, not re-opening the overall design direction. If the client gives fast answers on contact details, logo permissions, domain, and copy, this can move into delivery very soon.
