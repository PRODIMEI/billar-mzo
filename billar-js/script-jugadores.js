/* ==== MENÚ ==== */
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
});

/* ==== SUBMENÚ TORNEOS ==== */
const torneosBtn = document.getElementById("torneosBtn");
const submenu = document.getElementById("submenuTorneos");

torneosBtn.addEventListener("click", (e) => {
    e.preventDefault();
    submenu.classList.toggle("show");
});

/* ==== ESTRELLAS ==== */
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2
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

/* ==== PLANETAS FLOTANDO ==== */
const planetsContainer = document.getElementById("planets-container");

function crearPlaneta(url, size, duration, top, left) {
    const p = document.createElement("img");
    p.src = url;
    p.classList.add("planeta");
    p.style.width = size + "px";
    p.style.top = top + "%";
    p.style.left = left + "%";
    p.style.animationDuration = duration + "s";
    planetsContainer.appendChild(p);
}

crearPlaneta("billar-img/planet1.png", 140, 18, 10, 10);
crearPlaneta("billar-img/planet2.png", 180, 22, 70, 80);
crearPlaneta("billar-img/planet3.png", 120, 25, 40, 30);

/* ==== TARJETAS ANIMACIÓN ==== */
const cards = document.querySelectorAll(".jugador-card");

function mostrarTarjetas() {
    cards.forEach((card) => {
        const top = card.getBoundingClientRect().top;
        if (top < window.innerHeight - 50) {
            card.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", mostrarTarjetas);
mostrarTarjetas();
