/* ==== MENÚ ==== */
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

/* ==== SUBMENÚ ==== */
const torneosBtn = document.getElementById("torneosBtn");
const submenu = document.getElementById("submenuTorneos");

torneosBtn.addEventListener("click", (e) => {
  e.preventDefault();
  submenu.classList.toggle("show");
});

/* ==== LOGIN ==== */
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === "mzo" && pass === "7777") {
    window.location.href = "admin-panel.html";
  } else {
    document.getElementById("error-message").textContent =
      "Usuario o contraseña incorrectos.";
  }
});

/* ==== ESTRELLAS ==== */
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let stars = [];

for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 0.6 + 0.2
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
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animateStars);
}
animateStars();

/* ==== PLANETAS ==== */
const planetsContainer = document.getElementById("planets-container");

function planeta(url, size, top, left, dur) {
  const p = document.createElement("img");
  p.src = url;
  p.classList.add("planeta");
  p.style.width = size + "px";
  p.style.top = top + "%";
  p.style.left = left + "%";
  p.style.animationDuration = dur + "s";
  planetsContainer.appendChild(p);
}

planeta("billar-img/planet1.png", 180, 10, 10, 20);
planeta("billar-img/planet2.png", 220, 70, 75, 25);
planeta("billar-img/planet3.png", 140, 40, 30, 22);

