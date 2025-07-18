export function enableMobileProjectHoverFallback() {
  document.addEventListener("click", (event) => {
    const clickedWrapper = event.target.closest(".project-image-wrapper");

    // Cierra todos los activos menos el que fue clickeado (si hay)
    document.querySelectorAll(".project-image-wrapper.active").forEach((wrapper) => {
      if (wrapper !== clickedWrapper) {
        wrapper.classList.remove("active");
      }
    });

    // Si se hizo clic dentro de un wrapper, activarlo
    if (clickedWrapper) {
      // Si ya está activo, no hacemos nada (o podrías cerrarlo si quieres toggle)
      if (!clickedWrapper.classList.contains("active")) {
        clickedWrapper.classList.add("active");
      }
    }
  });
}