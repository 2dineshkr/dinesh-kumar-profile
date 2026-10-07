# Dinesh Kumar — Professional Portfolio

A fast, dependency-free professional portfolio covering software architecture, backend engineering, cloud, AI, mobile development, and independent technology projects.

## Structure
- `/` — professional portfolio
- `/projects/android/` — Android/mobile explorations
- `/projects/ai/` — AI/GenAI explorations
- `/projects/engineering/` — architecture/backend engineering explorations
- `/apps/` — application portfolio and resource hub
- `/apps/smartdialer/` — SmartDialer app landing page
- `/apps/smartdialer/privacy.html` — SmartDialer privacy policy
- `/apps/smartdialer/support.html` — SmartDialer support page

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

All applications are published under `/apps/<application-name>/` with an overview, privacy policy, and support page. SmartDialer was previously developed under the CallMate name; SmartDialer and its URLs are canonical going forward.

Before each application release, verify its published privacy statements against the release build, Android permissions, third-party SDKs, backup behavior, retention logic, Google Play Data Safety declaration, and store support contact.
