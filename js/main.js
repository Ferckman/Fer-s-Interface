import { initStartButton } from "./uiManager.js";
import { startMatrixEffect } from "./matrix.js";
import { TextTyper } from "./textTyper.js";
import { clickSound, openSound, playSound } from "./audioManager.js";
import { enableMobileProjectHoverFallback } from "./portfolioMovil.js";

// Iniciar Matrix
startMatrixEffect();

// Inicializar JARVIS al pulsar el botón inicial
initStartButton(startJarvis);

// Habilitar fallback de hover en móvil
enableMobileProjectHoverFallback();

// Tipado
const typer = new TextTyper("audios/typing.mp3", 0.4);
const hud = document.querySelector(".hud");
const hudTitle = document.getElementById("hud-title");
const hudSubtitle = document.getElementById("hud-subtitle");
const hudButtons = document.getElementById("hud-buttons");

function startJarvis() {
  
  hud.style.display = "block";
  setTimeout(() => {
    hud.style.opacity = "1";
  }, 50); // Pequeño delay para que la transición funcione
  
  typer.type({
    element: hudTitle,
    text: "Conexión establecida. Bienvenido al núcleo de operaciones.",
    speed: 40,
    onFinish: () => {
      setTimeout(() => {
        typer.type({
          element: hudSubtitle,
          text: "Soy tu asistente digital. Desde aquí puedes acceder a mis proyectos, juegos y apps móviles.",
          speed: 25,
          onFinish: () => {
            hudButtons.style.display = "block";
            hudButtons.classList.add("show");
          }
        });
      }, 400);
    }
  });
}

// Botón Ver Portafolio
document.getElementById("btn-portafolio").addEventListener("click", () => {
  playSound(clickSound);

  const portfolioSection = document.getElementById("portfolio");
  const introSection = document.getElementById("intro");

  portfolioSection.style.display = "block";
  portfolioSection.classList.add("visible");

  requestAnimationFrame(() => {
    const isMobileVertical = window.innerWidth <= 768 && window.innerHeight > window.innerWidth;

    if (isMobileVertical) {
      // Más compensación para móviles verticales (por notch o toolbars)
      const offset = 0; // prueba 160–200 si aún no es suficiente
      const y = portfolioSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      introSection.style.display = "none";
    }, 700); // pequeño margen extra si el scroll es más lento en móvil
  });
});


// Botón Ver CV
document.getElementById("btn-cv").addEventListener("click", () => {
  playSound(openSound);
  window.open("cv.html", "_blank");
});


// Botón Volver
document.getElementById("btn-volver").addEventListener("click", () => {
  playSound(clickSound);

  const introSection = document.getElementById("intro");
  const portfolioSection = document.getElementById("portfolio");

  // Mostrar la intro
  introSection.style.display = "block";
  introSection.classList.add("visible");

  // Esperar al siguiente frame para asegurar el repintado
  requestAnimationFrame(() => {
    introSection.scrollIntoView({ behavior: "smooth" });

    // Esperar que termine la animación de scroll antes de ocultar portfolio
    setTimeout(() => {
      portfolioSection.style.display = "none";
    }, 600);
  });
});

// Click en el botón "Cerrar"
document.getElementById("close-modal").addEventListener("click", cerrarModal);

// Click en la flecha "Volver"
document.getElementById("modal-back-btn").addEventListener("click", cerrarModal);

// Click fuera del modal
document.getElementById("info-modal").addEventListener("click", (e) => {
  if (e.target.id === "info-modal") {
    cerrarModal();
  }
});

// Abrir modal con iconos "info"
document.querySelectorAll(".info-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    abrirModal(icon);
  });
});

// Función común para abrir el modal
function abrirModal(element) {
  const modal = document.getElementById("info-modal");
  const title = element.getAttribute("data-title");
  const videoSrc = element.getAttribute("data-video");
  const contentHTML = element.getAttribute("data-modal-content");
  const platformLogos = element.getAttribute("data-platform-logos");

  // Título del proyecto (actualiza solo el texto del span)
  const titleTextElement = modal.querySelector(".modal-title-text");
  titleTextElement.textContent = title;

  // Limpiar y añadir logos de forma segura en su contenedor exclusivo
  const iconsContainer = modal.querySelector(".modal-platform-icons");
  iconsContainer.innerHTML = ""; // Borra los iconos anteriores para que no se dupliquen

  if (platformLogos) {
    const logosArray = platformLogos.split(",");
    logosArray.forEach((logo) => {
      const img = document.createElement("img");
      img.src = logo.trim();
      img.alt = "Plataforma";
      img.classList.add("platform-icon");
      iconsContainer.appendChild(img);
    });
  }

  // Contenido del modal
  const contentBox = modal.querySelector(".modal-paragraphs");
  contentBox.innerHTML = contentHTML;

  // Video
  const video = modal.querySelector("video");
  video.pause();
  video.querySelector("source").src = videoSrc;
  video.load();

  // Mostrar modal
  modal.classList.remove("hidden");
  document.body.classList.add("no-scroll"); // 🔒 Evita scroll de fondo

  // Hacer scroll arriba en el modal
  modal.querySelector(".modal-content").scrollTop = 0;
}

function cerrarModal() {
  const modal = document.getElementById("info-modal");
  const modalVideo = modal.querySelector("video");

  modal.classList.add("hidden");
  modalVideo.pause();
  modalVideo.currentTime = 0;
  document.body.classList.remove("no-scroll");
}