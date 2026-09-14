# Project Rules

- **Before designing any new page, section, or component, read `design.md` and follow its spec strictly** (colors, typography, spacing, component styles, responsive breakpoints). Keep the whole project visually consistent.
- Static single-page site: native HTML/CSS/JS, zero dependencies, no build step. Resources referenced by absolute paths `/assets/...` and served from the repo root.
- All changes must keep the site working at mobile (≥320px) and desktop widths; test before finishing.
- Always keep the local git repo in sync with `origin/main` (github.com/bozheng01/persona.git) when asked to commit/push.