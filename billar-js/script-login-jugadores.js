document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let user = document.getElementById("usuario").value.trim();
    let pass = document.getElementById("password").value.trim();
    let errorMsg = document.getElementById("errorMsg");

    if (user === "mzo" && pass === "7777") {
        window.location.href = "jugadores.html";
    } else {
        errorMsg.textContent = "Usuario o contraseña incorrectos";
    }
});
