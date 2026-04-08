# AGENTS.md

## Project

Personal portfolio website (French content) built with Jekyll + GitHub Pages. Dark theme with animated orbs.

## Build Commands

```bash
bundle install                    # Install Ruby dependencies
bundle exec jekyll serve --livereload --trace  # Dev server
bundle exec jekyll build          # Production build
```

Auto-deploys on push to `main` via GitHub Pages.

## File Organization

```
/
├── _includes/          # HTML partials: header.html, footer.html, orbs.html
├── css/                # common.css (variables), styles.css, about.css, skills.css, projects.css, project-detail.css
├── js/                 # nav-active.js, skills-animation.js
├── pages/              # about.html, skills.html, projects.html
│   └── projects/       # scolaires/ (school projects), project-detail.html
├── img/                # Images
├── index.html          # Home page
└── _site/              # Build output (do not edit)
```

## CSS Conventions

- Variables in `css/common.css`: fonts, colors (`--color-primary: #7c6af7`), spacing
- 2-space indentation, lowercase-hyphen naming
- Use CSS custom properties for all colors/fonts
- Include `prefers-reduced-motion` to disable animations

## Jekyll Templates

- Front matter `---` required on every page
- Include paths: `{% include header.html %} {% include footer.html %}`
- CSS/JS paths absolute: `/css/common.css`, `/js/nav-active.js`
- `lang="fr"` on `<html>` element

## Accessibility

- `aria-label` on icon-only buttons
- `aria-hidden="true"` on decorative elements (orbs)
- `focus-visible` for keyboard navigation
