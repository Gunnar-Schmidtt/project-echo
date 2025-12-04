# Reflection — APP Infrastructure & Architecture

## Tech Definitions

> Definition — RESTful API
>
> "REST (Representational State Transfer) is an architectural style for distributed hypermedia systems, and RESTful APIs conform to the six guiding constraints of REST including statelessness and a uniform interface."  
> Source: https://restfulapi.net/

> Definition — fetch API
>
> "The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network."  
> Source: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

> Definition — IT Infrastructure
>
> "IT infrastructure refers to the composite hardware, software, network resources and services required for the operation and management of an enterprise IT environment."  
> Source: https://www.cisco.com/

> Definition — Systems / IS Architecture
>
> "Information systems architecture is the conceptual model that defines the structure, behavior, and more views of a system. It provides a blueprint for the system and the project developing it."  
> Source: https://www.opengroup.org/togaf

---

## Infrastructure (Tech Stack)

- **Hosting / Pages:** GitHub Pages (source: repository `gh-pages` / `docs` folder)
- **HTML/CSS Framework:** Bootstrap 5 (via CDN)
- **CSS Reset:** normalize.css (via CDN)
- **Client scripting:** Vanilla JavaScript (single `scripts/scripts.js`)
- **Static assets:** images and JSON under `assets/`
- **Data format:** local JSON (`assets/projects.json`) loaded via `fetch API`
- **Markdown rendering:** `zero-md` library to render `.md` files as HTML in the browser
- **Dev tools:** Git + GitHub for source control; optional Live Server or `python -m http.server` for local testing. Visual Studio Code for editing code. Copilot for AI (ChatGPT 5 Mini) plugin assistance. ChatGPT5 for general question assistance.
- **Accessibility / QA tools used:** WAVE, Nu HTML Checker (links in the footer)
- **Languages used:** HTML, CSS, JavaScript

---

## Architecture (How it fits together)

1. Local development: developer edits files in the repository (`index.html`, `pages/*.html`, `styles/*`, `scripts/*`, `assets/*`). Test locally using a static server.
2. Content: static HTML pages in `pages/` and a root `index.html`. Project data stored in `assets/projects.json` and rendered dynamically via `fetch` by `scripts/scripts.js`.
3. Wiki/Docs: Markdown files placed in `assets/` (e.g., this file). The `pages/reflection.html` page uses zero-md to render markdown as HTML in the browser without server-side build steps.
4. Deployment: Push to GitHub repository; GitHub Pages serves the site. No build step required for this static site.

### Diagram

Local Files -> Git -> GitHub Repo -> GitHub Pages

Browser (Client)
- Requests HTML pages (index/pages/*)
- Static assets served (CSS, JS, images, markdown)
- `scripts/scripts.js` fetches `assets/projects.json` and populates project cards
- `pages/reflection.html` uses zero-md to load and render `assets/REFLECTION.md`

---

## Development Process

- **Issue Tracking & User Stories:** Use GitHub Issues for tracking work. Create small user stories, label them (e.g., `enhancement`, `bug`, `docs`).
- **Wireframing:** Low-fidelity wireframes (paper or Figma) before building the page structure.
- **Local to Repo Workflow:** edit files locally, commit to branch, open PR for review, merge to main, GitHub Pages auto-publishes.
- **Testing:** Manual testing in multiple browsers, Lighthouse/A11y checks.

---

## Takeaway & Advice to Past Self

- Start with a small README and a single `assets/` data file to avoid hardcoding content in pages. Use `fetch` early to separate content from layout.
- Make sure to keep routes and relative paths simple: prefer consistent structure (e.g., use absolute paths like `/assets/...`).

---

## References

- RESTful API overview — https://restfulapi.net/
- Fetch API docs — https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- zero-md — https://zerodevx.github.io/zero-md/
- TOGAF (Architecture framework) — https://www.opengroup.org/togaf

---

## Some Code Snippets to help spin up a fresh app

HTML (save as `index.html`)
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Starter App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles/styles.css">
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Starter</a>
      </div>
    </nav>

    <main class="container my-5">
      <h1 class="mb-4">Projects</h1>
      <div id="projects-row" class="row"></div>
    </main>

    <footer class="bg-dark text-white text-center py-3">
      <div class="container">© Starter</div>
    </footer>

    <script src="scripts/scripts.js"></script>
  </body>
</html>
```

CSS (save as `styles/styles.css`)
```css
body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
.card-img-top { object-fit: cover; height: 180px; }
.projects-row { gap: 1rem; }
```

JavaScript (save as `scripts/scripts.js`)
```javascript
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projects-row');
  fetch('assets/projects.json')
    .then(r => { if (!r.ok) throw new Error('fetch failed'); return r.json(); })
    .then(projects => {
      projects.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        col.innerHTML = `
          <div class="card mb-4">
            <img src="${p.image}" class="card-img-top" alt="${p.imageAlt}">
            <div class="card-body">
              <h5 class="card-title">${p.title}</h5>
              <p class="card-text">${p.description}</p>
            </div>
          </div>`;
        container.appendChild(col);
      });
    })
    .catch(err => { container.innerHTML = '<p>Error loading projects</p>'; console.error(err); });
});
```

Example JSON (save as `assets/projects.json`)
```json
[
  {
    "id": 1,
    "title": "Example Project",
    "image": "assets/example.jpg",
    "imageAlt": "Example thumbnail",
    "description": "A short description of the project.",
    "links": []
  }
]
```

Notes
- Keep images under `assets/` and reference with the relative path used above.