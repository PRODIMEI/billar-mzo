/* ===== MENÚ ===== */

document.getElementById("menuToggle").addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("show");
});
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

/* Mostrar/ocultar menú */
menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
});

/* Ocultar menú al rotar a horizontal */
window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
        menu.classList.remove("show");
    }
});

/* ===== SUBMENÚ ===== */
const torneosBtn = document.getElementById("torneosBtn");
const submenuTorneos = document.getElementById("submenuTorneos");

torneosBtn.addEventListener("click", (e) => {
    e.preventDefault();
    submenuTorneos.classList.toggle("show");
});
