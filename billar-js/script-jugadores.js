// ==== MENÚ HAMBURGUESA ====
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
});

// Submenú torneos
const torneosBtn = document.getElementById("torneosBtn");
const submenu = document.getElementById("submenuTorneos");

torneosBtn.addEventListener("click", (e) => {
    e.preventDefault();
    submenu.classList.toggle("show");
});

// ==== ANIMACIÓN DE TARJETAS ====
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

// ==== ESTRELLAS FONDO ====
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let estrellas = [];

for (let i = 0; i < 200; i++) {
    estrellas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2
    });
}

function animarEstrellas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    estrellas.forEach((estrella) => {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(estrella.x, estrella.y, estrella.size, 0, Math.PI * 2);
        ctx.fill();

        estrella.y += estrella.speed;

        if (estrella.y > canvas.height) {
            estrella.y = 0;
            estrella.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animarEstrellas);
}

animarEstrellas();

