export function initStartButton(callback) {
  const btn = document.createElement("button");
  btn.textContent = "POcender núcleo de control";
  btn.className = "start-btn";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    btn.classList.add("hide");
    setTimeout(() => {
      btn.remove(); // elimina del DOM
      callback();   // inicia JARVIS
    }, 300); // coincide con animación CSS opcional
  });
}
