// === TORNEOS ===
const torneos = [
  {
    nombre: "Torneo de Liga, Entre Amigos. 2025-2026",
    inicio: "08-12-2025",
    fin: "07-03-2026",
    competidores: 22,
    lugar: "La Bola Centro, Manzanillo, Colima",
    
    enlaces: {
      calendario: "liga2-calendario.html",
      partidos: "liga2-partidos.html",
      tabla: "liga2-tabla.html",
      bases: "liga2-bases.html",
      liguilla: "liga2-liguilla.html",
      galeria: "liga2-galeria.html"
      
    }
  },

  {
   nombre: "Torneo de Liga, Don. Pedrito Llamas. 2025",
    inicio: "22-10-2025",
    fin: "05-12-2025",
    competidores: 18,
    lugar: "La Bola Centro, Manzanillo, Colima",

    enlaces: {
      calendario: "calendario.html",
      partidos: "partidos.html",
      tabla: "tabla.html",
      bases: "Bases.html",
      liguilla: "liguilla1.html",
      galeria: "galeria-liga1.html"
    }
  }
];

const torneosContainer = document.getElementById("torneosContainer");

function renderTorneos() {
  torneosContainer.innerHTML = "";
  
  torneos.forEach(t => {
    const card = document.createElement("div");
    card.className = "torneo-card";

    card.innerHTML = `
      <h3>${t.nombre}</h3>
      <p><strong>Inicio:</strong> ${t.inicio}</p>
      <p><strong>Fin:</strong> ${t.fin}</p>
      <p><strong>Lugar:</strong> ${t.lugar}</p>
      <p><strong>Competidores:</strong> ${t.competidores}</p>

      <div class="torneo-buttons">
        <a href="${t.enlaces.calendario}" class="btn-torneo">Calendario</a>
        <a href="${t.enlaces.partidos}" class="btn-torneo">Partidos</a>
        <a href="${t.enlaces.tabla}" class="btn-torneo">Tabla</a>
        <a href="${t.enlaces.bases}" class="btn-torneo">Bases</a>
        <a href="${t.enlaces.liguilla}" class="btn-torneo">Liguilla</a>
        <a href="${t.enlaces.galeria}" class="btn-torneo">Galería</a>
      </div>
    `;
    
    torneosContainer.appendChild(card);
  });
}

renderTorneos();


// === MENÚ HAMBURGUESA ===
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
});




