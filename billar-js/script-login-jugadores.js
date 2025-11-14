# script-login-jugadores.js

```javascript
// Mostrar / ocultar menú
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Submenú torneos
const torneosBtn = document.getElementById("torneosBtn");
const submenuTorneos = document.getElementById("submenuTorneos");

torneosBtn.addEventListener("click", (e) => {
  e.preventDefault();
  submenuTorneos.style.display = submenuTorneos.style.display === "block" ? "none" : "block";
});

// LOGIN BÁSICO
const loginForm = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  if (usuario === "jugador" && password === "1234") {
    window.location.href = "jugadores.html"; // Página destino
  } else {
    mensaje.textContent = "Usuario o contraseña incorrectos";
  }
});
