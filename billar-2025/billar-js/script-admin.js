function abrir(pagina) {
    window.location.href = pagina;
}

document.getElementById("cerrarSesion").addEventListener("click", () => {
    if (confirm("¿Seguro que deseas cerrar sesión?")) {
        window.location.href = "login.html";
    }
});
