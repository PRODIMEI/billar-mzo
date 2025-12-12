// === TORNEOS ===
const torneos = [
  {
    nombre: "Torneo de Liga, Don. Pedrito Llamas. 2025",
    inicio: "22-10-2025",
    fin: "05-12-2025",
    competidores: 18,
    lugar: "La Bola Centro, Manzanillo, Colima",
    xxx: "xxx"
  },
  {
   nombre: "Torneo de Liga, Entre Amigos. 2025-2026",
    inicio: "08-12-2025",
    fin: "07-03-2026",
    competidores: 22,
    lugar: "La Bola Centro, Manzanillo, Colima",
    xxx: "xxx"
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
      <p><strong>xxx:</strong> ${t.xxx}</p>
      <div class="torneo-buttons">
        <a href="calendario.html" class="btn-torneo">Calendario</a>
        <a href="partidos.html" class="btn-torneo">Partidos</a>
        <a href="tabla.html" class="btn-torneo">Tablas</a>
        <a href="Bases.html" class="btn-torneo">Bases</a>
        <a href="liguilla1.html" class="btn-torneo">Liguilla</a>
        
        <a href="galeria-liga1.html" class="btn-torneo">Galería</a>
      </div>
    `;
    torneosContainer.appendChild(card);
  });
}

renderTorneos();

// === MENÚ HAMBURGUESA  <a href="tabla-liga1.html" class="btn-torneo">Tabla Actual</a> ===
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
});



