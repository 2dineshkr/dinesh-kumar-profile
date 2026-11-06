# Portfolio redesign review

Implemented locally for review. No deployment, push, pull request, Pages setting, or CI configuration was changed.

## Implementation

- Rebuilt the homepage around the supplied reference: horizontal navigation, two-column hero, purple headline emphasis, portrait expertise badges, five compact expertise cards, three featured projects, career timeline beside engineering principles, AI Lab banner, and a compact footer.
- Added the supplied LinkedIn URL and mailto:2dineshkr@gmail.com. GitHub remains the repository's original profile URL.
- Retained the static HTML/CSS/JavaScript architecture, original page URLs, all dedicated project documentation, SEO metadata, canonical URLs, structured data, robots.txt, and sitemap.xml. Added LinkedIn to the Person schema's sameAs field.
- The existing #about anchor remains as an alias, and #expertise now resolves correctly from existing subpages.
- Added mobile navigation with an expanded-state label, Escape handling, click-outside dismissal, link dismissal, and section tracking. Navigation remains available with JavaScript disabled.
- Added lightweight system-preference dark mode. Existing reduced-motion support, skip navigation, and visible keyboard focus are preserved.

## Authenticity and reference differences

- The original assets/images/dinesh-kumar.jpg is byte-for-byte unchanged. Its existing square composition is framed with CSS, rather than reproducing the mockup's generated cutout person.
- Career dates and titles remain those in the repository: Xebia / Principal Consultant / 2022–Present; IRIS Software / Senior Engineer / 2019–2022; GlobalLogic / Technical Consultant / 2017–2019; Software & Backend Engineering / 2013–2017. No invented employers, metrics, or achievements were added.
- The featured projects are TempGuard, Engineering Architecture, and AI & GenAI Lab. AI work is explicitly described as exploration. The architecture diagram is labelled conceptual and does not depict a client system.
- All material for the removed communication-app project has been excluded from this portfolio, including the copied artwork, links, unused gallery script, and associated unused presentation styles. The neighboring repository was not modified.
- TempGuard is a Windows utility built with C# and .NET Framework; the reference's Java/IoT dashboard was not reproduced.
- No authentic TempGuard screenshot was found in this repository. The existing logo is shown in an explicitly labelled screenshot placeholder. An authentic capture is still needed to complete the product preview.
- Existing verified company logos were unavailable; the timeline uses clear text labels.

## Design system and responsive behavior

- assets/css/theme.css: shared semantic colors, light/dark tokens, typography, spacing, radii, shadow, container sizing, heading sizes, and common detail-page improvements.
- assets/css/home.css: reference-inspired homepage composition; responsive breakpoints at 1100px, 900px, and 600px. Media-query values are documented centrally because native CSS variables cannot be used as media-query breakpoints.
- Desktop: five expertise columns, three project columns, and paired timeline/philosophy columns.
- Tablet: portrait and copy remain side by side, three expertise columns, and a full-width timeline/philosophy stack.
- Phones: stacked hero, compact portrait badges, two expertise columns, stacked project cards, full-width timeline and banner, wrapped footer links.

## Verification

- tools/check_site.py: all 9 HTML pages checked; no broken local paths or fragment targets; original portrait bytes match HEAD; homepage metadata retained.
- tools/verify.cjs: real headless Chrome, served locally under /dinesh-kumar-profile/ to verify GitHub Pages base-path compatibility. No third-party browser dependency needed.
- Browser checks at 1440, 768, 390, and 320 CSS pixels: no horizontal overflow or out-of-bounds content; all homepage images decode; one H1 and three project cards; all homepage anchors resolve.
- Mobile menu opens and closes with Escape at tablet and phone widths. Active-section checks cover expertise, projects, experience, and the page bottom/contact state.
- Existing project hub, application hub, TempGuard, Engineering Architecture, AI Lab, Android page, privacy, and 404 page were opened at 390px with no horizontal overflow or broken image elements. The 404 page retains production-absolute assets for nested missing routes, so its new shared theme will become available only when an approved deployment includes that file.
- JavaScript syntax checks and git diff --check pass.
- Full-page screenshots captured and visually inspected for desktop, tablet, small phone, and dark phone. 390px light capture also available. Keyboard focus rings are intentionally visible after menu Escape checks.
- External destination availability could not be verified through the available web fetcher. Existing repository URLs and the user-supplied LinkedIn/email were preserved; no guarantee of third-party availability is claimed.
- No automated accessibility audit or physical-device test was performed. Semantic markup, keyboard navigation, focus visibility, reduced motion, and system dark mode were checked locally.

## Screenshots

- home-1440.png — desktop
- home-768.png — tablet
- home-390.png — phone
- home-320.png — small phone
- home-dark-390.png — system dark theme
- browser-checks.json and static-checks.json — machine-readable evidence

## Files changed

Modified: .gitignore, README.md, index.html, assets/css/site.css, assets/js/site.js, 404.html, privacy.html, apps/index.html, apps/tempguard/index.html, projects/index.html, projects/android/index.html, projects/engineering/index.html, projects/ai/index.html.

Added: assets/css/theme.css, assets/css/home.css, tools/check_site.py, tools/preview.py, tools/verify.cjs, this review report, five review PNGs, and two JSON check reports.

Removed: assets/js/gallery.js (unused product gallery). No existing photograph, logo, or technical project page was deleted.

## Deployment status

Ready for user visual review. The remaining product-image limitation is the TempGuard screenshot placeholder. Deployment remains pending explicit user approval after screenshot review. Nothing has been pushed or deployed.
