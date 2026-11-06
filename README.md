# Dinesh Kumar — Professional Portfolio

A fast, dependency-free professional portfolio covering software architecture, backend engineering, cloud, AI, mobile development, and independent technology projects.

## Structure
- `/` — professional portfolio
- `/projects/android/` — Android/mobile explorations
- `/projects/ai/` — AI/GenAI explorations
- `/projects/engineering/` — architecture/backend engineering explorations
- `/apps/` — application portfolio and resource hub
- `/apps/tempguard/` — TempGuard Windows utility overview

## GitHub Pages
Enable GitHub Pages from repository Settings → Pages → Deploy from a branch → main → root.

The site is configured for `https://2dineshkr.github.io/dinesh-kumar-profile/`. If the deployment URL or domain changes, update the canonical URLs, Open Graph URLs, `robots.txt`, `sitemap.xml`, and `404.html`.

## Local preview

Serve the repository root with any static HTTP server. For example:

```shell
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Content checklist

- Add verified, non-confidential impact metrics when available.
- Add a public email, LinkedIn profile, and résumé only after confirming the exact URLs.
- Add project screenshots and release links when they represent tested builds.
- Keep project descriptions explicit about whether work is released, in development, or exploratory.

## Application publishing

All applications are published under `/apps/<application-name>/` with an overview, privacy policy, and support page.

Before each application release, verify its published privacy statements against the release build, Android permissions, third-party SDKs, backup behavior, retention logic, Google Play Data Safety declaration, and store support contact.

## Redesign and local verification

Shared colors, typography, spacing, radii, and system-aware light/dark themes live in
`assets/css/theme.css`. Homepage composition lives in `assets/css/home.css`;
`assets/css/site.css` retains the existing detail-page layouts. Responsive layout
breakpoints are documented beside the theme tokens and implemented in media queries.

Run `python tools/check_site.py` to check internal paths, anchors, metadata, and the
original portrait bytes. Run `node tools/verify.cjs` on Windows with Python, Node 22+,
and Chrome installed to start an isolated local preview, check the requested viewport
sizes, and refresh `review/` screenshots. No npm dependencies are required. The script
starts and stops its own preview server and headless browser; its disposable browser
profile is ignored under `.local-qa/`.

See `review/REDESIGN-REVIEW.md` for the implementation summary, asset limitations,
verification evidence, and screenshot inventory. This work has not been deployed.
