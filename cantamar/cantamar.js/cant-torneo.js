// === TORNEOS ===
const torneos = [
 {
    nombre: "5ta-Liga, Torneo Los Consagrados 2026",
    inicio: "21-05-2026",
    fin: "02-08-2026",
    competidores: 20,
    lugar: "La Bola Billiards, Manzanillo, Colima",

    enlaces: {
      calendario: "../cant-calendario.html",
      partidos: "cant-partidos.html",
      tabla: "cant-tabla.html",
      bases: "cant-Bases.html",
      liguilla: "cant-liguilla1.html",
      galeria: "cant-galeria-liga1.html"
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



