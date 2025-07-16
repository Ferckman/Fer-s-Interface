import { initStartButton } from "./uiManager.js";
import { startMatrixEffect } from "./matrix.js";
import { TextTyper } from "./textTyper.js";
import { clickSound, openSound, playSound } from "./audioManager.js";

// Iniciar Matrix
startMatrixEffect();

// Tipado
const typer = new TextTyper("audio/typing.mp3", 0.4);

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


// Click en botones
document.getElementById("btn-portafolio").addEventListener("click", () => {
  playSound(clickSound);

  // Mostrar portafolio
  const portfolioSection = document.getElementById("portfolio");
  portfolioSection.style.display = "block";
  portfolioSection.classList.add("visible");

  // Hacer scroll hacia el portafolio
  portfolioSection.scrollIntoView({ behavior: "smooth" });

  // Espera de (520 ms)
  setTimeout(() => {
    // Ocultar la intro
    //document.getElementById("intro").style.display = "none";
  }, 520);
});

document.getElementById("btn-cv").addEventListener("click", () => {
  playSound(openSound);
});

document.getElementById("btn-volver").addEventListener("click", () => {
  playSound(clickSound);
  
  // Mostrar la intro de nuevo
  const introSection = document.getElementById("intro");
  introSection.style.display = "block";
  introSection.classList.add("visible");

  // Hacer scroll arriba de todo
  introSection.scrollIntoView({ behavior: "smooth" });

  // Espera de (520 ms)
  setTimeout(() => {
    // Ocultar el portafolio
    //const portfolioSection = document.getElementById("portfolio");
    //portfolioSection.style.display = "none";
  }, 520);
});

initStartButton(startJarvis);
