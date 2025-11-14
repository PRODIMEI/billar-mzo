/* === LOGIN === */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "mzo" && pass === "7777") {
      window.location.href = "jugadores.html";
    } else {
      document.getElementById("error-message").textContent = "Usuario o contraseña incorrectos.";
    }
  });
}

/* === MENÚ HAMBURGUESA === */
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
}

/* === FONDO GALÁCTICO === */
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

const stars = [];
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 1.5 + 0.5,
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  stars.forEach((s) => {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
    s.y += s.speed;
    if (s.y > canvas.height) s.y = 0;
  });

  requestAnimationFrame(animateStars);
}
animateStars();
