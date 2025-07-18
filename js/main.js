import { initStartButton } from "./uiManager.js";
import { startMatrixEffect } from "./matrix.js";
import { TextTyper } from "./textTyper.js";

// Tipado
const typer = new TextTyper("audios/typing.mp3", 0.4);
const hud = document.querySelector(".hud");
const hudTitle = document.getElementById("hud-title");
const hudSubtitle = document.getElementById("hud-subtitle");
const hudButtons = document.getElementById("hud-buttons");

// Iniciar Matrix
startMatrixEffect();

// Inicializar JARVIS al pulsar el botón inicial
initStartButton(startJarvis);

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