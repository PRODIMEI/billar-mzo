document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const clave = document.getElementById("clave").value.trim();

        // 👇 Aquí defines tu usuario/clave de administrador
        const adminUser = "admin";
        const adminPass = "12345";

        if (usuario === adminUser && clave === adminPass) {
            mensaje.style.color = "#00ff80";
            mensaje.textContent = "Acceso permitido ✅";
            setTimeout(() => {
                window.location.href = "estadisticas.html";
            }, 1000);
        } else {
            mensaje.style.color = "#ff5555";
            mensaje.textContent = "Usuario o contraseña incorrectos ❌";
        }
    });
});
