const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

/* Mostrar/ocultar menú */
menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");

    // Cerrar el submenú si está abierto
    const submenu = document.getElementById("submenuTorneos");
    submenu.classList.remove("show");
});

/* Ocultar menú al rotar o ampliar pantalla */
window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
        menu.classList.remove("show");

        // Cerrar submenú
        const submenu = document.getElementById("submenuTorneos");
        submenu.classList.remove("show");
    }
});

/* ===== SUBMENÚ ===== */
const torneosBtn = document.getElementById("torneosBtn");
const submenuTorneos = document.getElementById("submenuTorneos");

torneosBtn.addEventListener("click", (e) => {
    // Evita que el menú se cierre cuando se abre el submenú
    e.preventDefault(); 
    
    submenuTorneos.classList.toggle("show");
});
