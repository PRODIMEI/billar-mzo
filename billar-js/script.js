document.addEventListener("DOMContentLoaded", () => {
    console.log("Página de Liga de Billar cargada correctamente ✅");
});

// Seleccionamos el contenedor
const space = document.getElementById('space-background');

// Función para crear estrellas
function createStars(count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1; // tamaño aleatorio 1-4px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        space.appendChild(star);
    }
}

// Función para crear planetas
function createPlanets(count) {
    const colors = ['#ff7f50','#6495ed','#ffb347','#9b59b6','#2ecc71'];
    for (let i = 0; i < count; i++) {
        const planet = document.createElement('div');
        planet.classList.add('planet');
        const size = Math.random() * 50 + 30; // tamaño aleatorio 30-80px
        planet.style.width = `${size}px`;
        planet.style.height = `${size}px`;
        planet.style.top = `${Math.random() * 80 + 10}%`;
        planet.style.left = `${Math.random() * 80 + 10}%`;
        planet.style.background = colors[Math.floor(Math.random() * colors.length)];
        planet.style.animationDuration = `${Math.random() * 20 + 20}s`;
        space.appendChild(planet);
    }
}

// Generamos 100 estrellas y 5 planetas
createStars(100);
createPlanets(5);


// Efecto parallax al hacer scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const speed = (index % 5 + 1) * 0.2; // velocidad diferente para cada estrella
        star.style.transform = `translateY(${scrollY * speed}px)`;
    });

    const planets = document.querySelectorAll('.planet');
    planets.forEach((planet, index) => {
        const speed = (index % 3 + 1) * 0.1; // velocidad más lenta para planetas
        planet.style.transform = `translateY(${scrollY * speed}px)`;
    });
});




// --- SUBMENÚ DE TORNEOS ---
document.addEventListener("DOMContentLoaded", () => {
    const torneosBtn = document.getElementById("torneosBtn");
    const submenuTorneos = document.getElementById("submenuTorneos");

    if (torneosBtn && submenuTorneos) {
        torneosBtn.addEventListener("click", (e) => {
            e.preventDefault();
            submenuTorneos.classList.toggle("activo");
        });

        // Cierra el submenú al hacer clic fuera
        document.addEventListener("click", (e) => {
            if (!torneosBtn.contains(e.target) && !submenuTorneos.contains(e.target)) {
                submenuTorneos.classList.remove("activo");
            }
        });
    }
});

// --- MENÚ RESPONSIVO ---
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.querySelector(".menu ul");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }
});


