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
          text: "Soy tu asistente digital. Desde aquí puedes acceder a mi currículum, proyectos, juegos y apps móviles.",
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
      const offset = 100; // prueba 160–200 si aún no es suficiente
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

// Abrir el modal
document.querySelectorAll(".btn-mas-info").forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = document.getElementById("info-modal");
    const title = btn.getAttribute("data-title");
    const description = btn.getAttribute("data-description");
    const videoSrc = btn.getAttribute("data-video");

    // Actualizar contenido del modal
    modal.querySelector("h3").textContent = title;
    modal.querySelector("p").textContent = description;
    const video = modal.querySelector("video");

    video.pause();
    video.querySelector("source").src = videoSrc;
    video.load();

    modal.classList.remove("hidden");
  });
});

// Cerrar el modal
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("info-modal").classList.add("hidden");
  const modalVideo = document.querySelector("#info-modal video");
  modalVideo.pause();
  modalVideo.currentTime = 0;
});
