# AGENTS.md

## Build Commands

```bash
bundle install
bundle exec jekyll serve --livereload --trace  # Dev: http://localhost:4000
bundle exec jekyll build                        # Build → _site/
```

Auto-deploys on push to `main` via GitHub Pages.

## Key Conventions

- `<html lang="fr">` on all pages
- Front matter `---` required on every template
- CSS variables in `css/common.css`: `--color-primary: #7c6af7`
- Include `prefers-reduced-motion` for animations
- `aria-label` on icon-only buttons, `aria-hidden="true"` on decorative

## Project Layout

```
_includes/    header.html, footer.html, orbs.html
css/          common.css, styles.css, about.css, skills.css, projects.css
js/           nav-active.js, skills-animation.js
pages/        about.html, skills.html, projects.html
templates/    project-detail.html
```

Refer to `README.md` for setup, `ROADMAP.md` for pending work.