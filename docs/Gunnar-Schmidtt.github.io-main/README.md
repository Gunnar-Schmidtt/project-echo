Gunnar Schmidtt — Web Portfolio

A compact developer profile and static web portfolio. This repository contains the source for the GitHub Pages site and simple client-side app used to display projects, blog posts, resources, and a short reflection about the project's architecture.

Live site
- https://gunnar-schmidtt.github.io/project-echo/

Site map
- Home: `index.html`
- Blog: `pages/blog.html`
- Projects: `pages/projects.html` (project cards loaded from `assets/projects.json`)
- Reflection: `pages/reflection.html` (renders `assets/REFLECTION.md`)
- Resources: `pages/resources.html`

Key skills
- HTML5, semantic markup
- CSS (Bootstrap 5, responsive layouts)
- JavaScript (DOM, fetch API, client-side rendering)
- Markdown rendering (`zero-md`) and static site workflows
- Git / GitHub (Pages deployment)

Tech stack & tools
- Hosting: GitHub Pages
- UI: Bootstrap 5 (CDN)
- JS: Vanilla ES6+ (single `scripts/scripts.js`)
- Data: Local JSON (`assets/projects.json`) loaded with `fetch`
- Docs: Markdown rendered client-side via `zero-md` (fallback: `marked.js`)
- Local testing: `python -m http.server` or VS Code Live Server

Notes
- The site uses client-side `fetch` to load `assets/projects.json`. Browsers block these requests from `file://` URLs — you must serve the files over HTTP to test fetching.
- The Reflection page uses `zero-md` to render Markdown in the browser; a `marked.js` fallback is included if zero-md cannot render.

Contributing
- Edit content or add projects by updating files under `pages/` or `assets/`.
- To add a project, append an object to `assets/projects.json` with `title`, `image`, `imageAlt`, `description`, and optional `links`.

Credits
- Bootstrap, Normalize.css, MDN, project thumbnails and assets.
