# AGENTS.md

## Project

French personal portfolio. Jekyll + GitHub Pages, dark theme with animated orbs. All content is in French.

## Build Commands

```bash
bundle install                    # Install Ruby dependencies
bundle exec jekyll serve --livereload --trace  # Dev server (http://localhost:4000)
bundle exec jekyll build          # Production build → _site/
```

Auto-deploys on push to `main` via GitHub Pages. No `_config.yml` (uses GitHub Pages defaults).

## File Structure

```
_includes/      header.html, footer.html, orbs.html
css/            common.css (variables), styles.css, about.css, skills.css, projects.css
js/             nav-active.js, skills-animation.js
pages/          about.html, skills.html, projects.html
  └── projects/ personnel/, scolaire/
templates/      project-detail.html
_site/          Build output (do not edit, auto-deployed)
```

## CSS Conventions

- Variables in `css/common.css`: `--color-primary: #7c6af7`, fonts, spacing
- 2-space indentation, lowercase-hyphen naming
- All colors/fonts via CSS custom properties
- Include `prefers-reduced-motion` for animations

## Jekyll Templates

- Front matter `---` required on every page
- Includes: `{% include header.html %}`, `{% include footer.html %}`
- Paths absolute: `/css/common.css`, `/js/nav-active.js`
- `<html lang="fr">` required

## Accessibility

- `aria-label` on icon-only buttons
- `aria-hidden="true"` on decorative elements (orbs)
- `focus-visible` for keyboard navigation

## Pending Work (see ROADMAP.md)

- Complete school and personal projects
- Add contact page, interests section, CV download
- Show scroll indicator for projects with many tags
