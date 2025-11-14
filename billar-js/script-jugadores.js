/* === LOGIN === */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    if (u === "mzo" && p === "7777") {
      window.location.href = "jugadores.html";
    } else {
      document.getElementById("error-message").textContent =
        "Usuario o contraseña incorrectos.";
    }
  });
}

/* === MENÚ === */
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
}

/* === ESTRELLAS === */
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

const stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 0.8 + 0.4,
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

/* === ANIMACIÓN DE TARJETAS === */
const cards = document.querySelectorAll(".jugador-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => observer.observe(card));


