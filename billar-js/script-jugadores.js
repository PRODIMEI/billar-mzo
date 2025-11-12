// === LOGIN VISUAL ===
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    // Usuario simulado
    if (user === "mzo" && pass === "7777") {
      window.location.href = "jugadores.html";
    } else {
      document.getElementById("error-message").textContent = "Usuario o contraseña incorrectos.";
    }
  });
}

// === MENÚ HAMBURGUESA ===
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
}

