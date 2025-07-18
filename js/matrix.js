export function startMatrixEffect(canvasSelector = ".matrix") {
  const canvas = document.querySelector(canvasSelector);
  const ctx = canvas.getContext("2d");

  let fontSize = 16;
  let columns;
  let drops;

  function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  }

  const chars = "アァイィウヴエカガキギクグケゲコゴサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  const matrix = chars.split("");

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ffff";
    ctx.font = `${fontSize}px Share Tech Mono`;

    for (let i = 0; i < drops.length; i++) {
      const text = matrix[Math.floor(Math.random() * matrix.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  let intervalId;

  function start() {
    init();
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(draw, 50);
  }

  // Inicializar por primera vez
  start();

  // Ajustar canvas al redimensionar sin recargar la página
  window.addEventListener("resize", () => {
    start();
  });
}