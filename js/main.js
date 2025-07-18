import { initStartButton } from "./uiManager.js";
import { startMatrixEffect } from "./matrix.js";
import { TextTyper } from "./textTyper.js";
import { clickSound, openSound, playSound } from "./audioManager.js";
import { enableMobileProjectHoverFallback } from "./portfolioMovil.js";

// Iniciar Matrix
startMatrixEffect();

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

  // Mostrar el portafolio antes de animar
  portfolioSection.style.display = "block";
  portfolioSection.classList.add("visible");

  // Esperamos a que el layout se repinte antes de hacer scroll
  requestAnimationFrame(() => {
    portfolioSection.scrollIntoView({ behavior: "smooth" });

    // Y esperamos al final del scroll (animación de ~500ms)
    setTimeout(() => {
      introSection.style.display = "none";
    }, 600); // suficiente para completar scroll suave
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
});

// Inicializar JARVIS al pulsar el botón inicial
initStartButton(startJarvis);

// Habilitar fallback de hover en móvil
enableMobileProjectHoverFallback();
