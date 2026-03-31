# AGENTS.md

## Project Overview

This is a personal portfolio website built with Jekyll and GitHub Pages. The site features a dark theme with animated orbs, responsive design, and French content.

## Build Commands

### Local Development
```bash
# Install Ruby dependencies
bundle install

# Start local server with live reload
bundle exec jekyll serve --livereload --trace

# Build for production
bundle exec jekyll build

# Serve production build locally
bundle exec jekyll serve --detach
```

### GitHub Pages
- The site auto-builds on push to the `main` branch via GitHub Actions
- No manual build commands needed for deployment

### Jekyll Commands
```bash
# Clean build artifacts
bundle exec jekyll clean

# Check for configuration issues
bundle exec jekyll doctor

# Import content from other platforms
bundle exec jekyll import
```

## Code Style Guidelines

### HTML

#### Structure
- Use HTML5 semantic elements (`<header>`, `<main>`, `<nav>`, `<footer>`)
- Always include `lang="fr"` on the `<html>` element (French site)
- Include proper meta tags in `<head>`:
  ```html
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ```
- Include accessibility attributes: `aria-label`, `aria-expanded`, `aria-hidden`, etc.

#### Formatting
- Use 2-space indentation
- Place `<script>` tags before closing `</body>` (unless defer/async)
- Separate includes with single space: `{% include header.html %} {% include footer.html %}`

#### Jekyll Templates
- Front matter required at top of every page: `---`
- Use includes from `_includes/` directory
- CSS/JS paths should be absolute: `/css/common.css`, `/js/nav-active.js`

### CSS

#### Variables (defined in `common.css`)
```css
:root {
  --title-font: "Inter", sans-serif;
  --text-font: "Inter", sans-serif;
  --code-font: "JetBrains Mono", monospace;
  
  --main-bg-color: #0f0f12;
  --color-surface: #18181f;
  --color-text-primary: #f0eff6;
  --color-text-secondary: #a09aad;
  --color-primary: #7c6af7;
  --color-primary-dark: #5b4ed4;
  --color-accent: #a78bfa;
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}
```

#### Naming Conventions
- Use lowercase with hyphens: `.navbar-list`, `.skill-card`
- BEM-lite: `.block`, `.block-element`, `.block--modifier`
- State classes: `.nav-active`, `.nav-disabled`, `.navbar-open`

#### Formatting
- 2-space indentation
- One selector per line for multi-line selectors
- Place media queries at end of file or grouped at bottom
- Use `rem` for spacing, `px` only for fine-grained values
- Use CSS custom properties for colors, fonts, and spacing
- Always include `prefers-reduced-motion` media query to disable animations

#### Best Practices
- Use `flex` and `grid` for layouts over floats
- Include `box-shadow` and `transform` transitions for interactive elements
- Group related styles together
- Comment section headers with `/* ============================================ */` format
- Include hover states for all interactive elements

### JavaScript

#### Structure
- Wrap all code in IIFE: `(function() { ... })();`
- Use strict mode where appropriate
- DOM-ready check:
  ```javascript
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  ```

#### Naming Conventions
- Constants: `UPPER_SNAKE_CASE`
- Functions/variables: `camelCase`
- Private functions can use leading underscore: `_helperFunction()`

#### Formatting
- 2-space indentation
- Use `const` and `let` - avoid `var`
- Always use strict equality: `===` and `!==`
- Use template literals for string interpolation
- Trailing commas in multi-line objects/arrays

#### Best Practices
- Use `querySelector` with specific selectors, not `querySelectorAll` for single elements
- Use `addEventListener` over inline event handlers
- Handle errors gracefully with try/catch for URL parsing
- Include keyboard support (Escape key for menus)
- Use `IntersectionObserver` for scroll-based animations
- Respect `prefers-reduced-motion` in JavaScript animations

### Accessibility

- Include `aria-label` on icon-only buttons
- Use `aria-expanded` for collapsible menus
- Add `aria-disabled="true" tabindex="-1"` for disabled nav items
- Include focus indicators (`focus-visible`) for keyboard navigation
- Use `aria-hidden="true"` for decorative elements (orbs)

### File Organization

```
/
├── _includes/          # Reusable HTML partials
│   ├── footer.html
│   ├── header.html
│   └── orbs.html
├── css/                # Stylesheets
│   ├── common.css      # Variables, reset, shared styles
│   ├── styles.css      # Home page styles
│   ├── about.css       # About page styles
│   └── competences.css # Skills page styles
├── js/                 # JavaScript files
│   ├── nav-active.js   # Navigation active state
│   └── skills-animation.js  # Skills progress bars
├── pages/              # Page content
│   ├── about.html
│   └── competences.html
├── img/                # Images
├── index.html          # Home page
└── _site/              # Jekyll build output (do not edit)
```

### Responsive Breakpoints

```css
/* Mobile first approach */
/* Tablet: */
@media (max-width: 768px) { ... }

/* Small mobile: */
@media (max-width: 480px) { ... }

/* Prefer reduced motion: */
@media (prefers-reduced-motion: reduce) { ... }
```

### Performance Considerations

- Use `will-change: transform` sparingly for animated elements
- Lazy load images where possible
- Use Font Awesome icons via CDN for caching benefits
- Use Google Fonts via CDN with proper display swap
- Include `defer` or place scripts at end of body
