(function () {
  const ACTIVE_CLASS = "nav-active";

  function normalizePath(path) {
    if (!path) return "/index.html";
    let p = path.toString();

    // If a full URL is passed, reduce it to pathname.
    try {
      if (/^https?:\/\//i.test(p)) {
        p = new URL(p, window.location.href).pathname;
      }
    } catch (e) {
      // ignore
    }

    // Normalize trailing slashes.
    p = decodeURIComponent(p).replace(/\/+$/, "");

    // Homepage alias.
    if (p === "" || p === "/") return "/index.html";

    // Ensure it starts with "/"
    if (!p.startsWith("/")) p = `/${p}`;
    return p;
  }

  function setActiveLink() {
    const links = document.querySelectorAll(".navbar-item a[href]");
    if (!links || links.length === 0) return false;

    // Clear previous state
    links.forEach((a) => a.classList.remove(ACTIVE_CLASS));

    const currentPath = normalizePath(window.location.pathname);
    let matched = false;

    links.forEach((a) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const hrefPath = normalizePath(href);
      if (hrefPath === currentPath) {
        a.classList.add(ACTIVE_CLASS);
        matched = true;
      }
    });

    return matched;
  }

  function init() {
    if (setActiveLink()) return;

    // Header might be injected asynchronously (w3-include-html).
    const obs = new MutationObserver(() => {
      if (setActiveLink()) obs.disconnect();
    });

    obs.observe(document.documentElement, { childList: true, subtree: true });

    // Avoid running forever if nav is not present.
    setTimeout(() => obs.disconnect(), 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

