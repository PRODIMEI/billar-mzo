// === JS DE LA PAGINA GALERIA script-galeria.js ===


/* ===== FONDO ESPACIAL ===== */
const space = document.getElementById("space-background");

function createStars(count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.width = star.style.height = `${Math.random()*3+1}px`;
        star.style.top = `${Math.random()*100}%`;
        star.style.left = `${Math.random()*100}%`;
        space.appendChild(star);
    }
}

function createPlanets(count) {
    const colors = ["#ff7f50", "#6495ed", "#ffb347", "#9b59b6", "#2ecc71"];
    for (let i = 0; i < count; i++) {
        const p = document.createElement("div");
        p.className = "planet";
        const size = Math.random() * 50 + 30;
        p.style.width = p.style.height = `${size}px`;
        p.style.top = `${Math.random() * 80 + 5}%`;
        p.style.left = `${Math.random() * 80 + 5}%`;
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        space.appendChild(p);
    }
}

createStars(120);
createPlanets(7);


/* ===== MENÚ RESPONSIVE ===== */


document.addEventListener('DOMContentLoaded', () => {
  const torneosBtn = document.getElementById('torneosBtn');
  const submenu = document.getElementById('submenuTorneos');

  if (!torneosBtn || !submenu) return;

  // Función para abrir/cerrar y posicionar el submenú
  function toggleSubmenu(e) {
    e.preventDefault();
    // Si estamos en modo desktop calculamos la posición respecto al botón
    if (window.innerWidth > 850) {
      const rect = torneosBtn.getBoundingClientRect();
      // Usamos el elemento .menu como referencia (su position:relative)
      const menuContainer = torneosBtn.closest('.menu') || document.querySelector('.menu');
      const menuRect = menuContainer ? menuContainer.getBoundingClientRect() : { left: 0, top: 0 };
      // Colocamos el submenú justo debajo del botón (left relativo al contenedor menu)
      submenu.style.left = (rect.left - (menuRect.left || 0)) + 'px';
      submenu.style.top = (rect.bottom - (menuRect.top || 0)) + 'px';
      // opcional: fijar ancho para que coincida con el texto
      // submenu.style.width = rect.width + 'px';
    } else {
      // en móvil, removemos estilos inline para que use CSS responsive (full width)
      submenu.style.left = '';
      submenu.style.top = '';
      submenu.style.width = '';
    }

    submenu.classList.toggle('activo');
  }

  torneosBtn.addEventListener('click', toggleSubmenu);

  // cerrar submenu si se clickea fuera
  document.addEventListener('click', (ev) => {
    if (!torneosBtn.contains(ev.target) && !submenu.contains(ev.target)) {
      submenu.classList.remove('activo');
    }
  });

  // reubicar el submenu al cambiar tamaño (por si el layout cambia)
  window.addEventListener('resize', () => {
    if (submenu.classList.contains('activo')) {
      // simula un re-posicionamiento
      const evt = new MouseEvent('click', { bubbles: true, cancelable: true });
      // removemos la clase para luego volverla a activar y reposicionar correctamente
      submenu.classList.remove('activo');
      // pequeño timeout para que el DOM actualice
      setTimeout(() => torneosBtn.dispatchEvent(evt), 10);
    }
  });
});
