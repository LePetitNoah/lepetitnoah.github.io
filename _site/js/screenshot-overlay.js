document.addEventListener("DOMContentLoaded", () => {
  const screenshots = document.querySelectorAll(".screenshot-item img");
  const overlay = document.getElementById("screenshotOverlay");
  const overlayImage = document.getElementById("overlayImage");
  const overlayClose = document.getElementById("overlayClose");

  if (!overlay || !overlayImage || !overlayClose) return;

  const openOverlay = (src, alt) => {
    overlayImage.src = src;
    overlayImage.alt = alt || "Aperçu en plein écran";
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    overlayClose.focus();
  };

  const closeOverlay = () => {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    overlayImage.src = "";
  };

  screenshots.forEach((img) => {
    img.addEventListener("click", () => {
      openOverlay(img.src, img.alt);
    });
  });

  overlayClose.addEventListener("click", closeOverlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeOverlay();
    }
  });
});