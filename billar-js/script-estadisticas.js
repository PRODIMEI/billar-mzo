/* ============================================================
   script-estadisticas.js
   - Maneja jornadas, registro de resultados, tabla de posiciones
   - Guarda en localStorage
   - Genera PDF y JPG con el mismo estilo (sin columna Opciones)
   ============================================================ */

/* -------- DATOS BASE -------- */
// Lista de jugadores (usted ya la tenía)
const jugadores = [
   "Ramon","Adrián Méndez (Alemán)","Erick Bernal","Cristian Pineda (Kity)","Miguelito","Eduardo Rendon (Charro)",
   "Cayetano (Caye)","Francisco Aguilar (MTTO.)","Ginno López","Rafael Figueroa Silva (Rafa)","Santos Chavez",
   "Matias","Martín Barreto","Héctor Pineda (Cagochi)","Israel Peña","Julio Torres","Gustavo Lozoya",
    "Kechis","Francisco Negrete (Rioco)","Coliman","Fernando (Pollo)","Alejandro Torres (Alex)"
];

// Jornadas (usted ya las definió hasta la 21)
const jornadas = {
  /* pegar aquí su objeto jornadas tal cual (omitido para brevedad en este bloque),
     pero en su archivo real debe estar completo tal como ya lo tiene */
   1: [["Erick Bernal","Martín Barreto"],["Adrián Méndez (Alemán)","Miguelito"],["Eduardo Rendon (Charro)","Héctor Pineda (Cagochi)"],["Alejandro Torres (Alex)","Fernando (Pollo)"],["Santos Chavez","Israel Peña"],["Ramon","Kechis"],["Cristian Pineda (Kity)","Francisco Negrete (Rioco)"],["Rafael Figueroa Silva (Rafa)","Coliman"],["Cayetano (Caye)","Julio Torres"],["Matias","Gustavo Lozoya"],["Francisco Aguilar (MTTO.)","Ginno López"]],
   2: [["Erick Bernal","Adrián Méndez (Alemán)"],["Eduardo Rendon (Charro)","Martín Barreto"],["Alejandro Torres (Alex)","Miguelito"],["Santos Chavez","Héctor Pineda (Cagochi)"],["Ramon","Fernando (Pollo)"],["Cristian Pineda (Kity)","Israel Peña"],["Rafael Figueroa Silva (Rafa)","Kechis"],["Cayetano (Caye)","Francisco Negrete (Rioco)"],["Matias","Coliman"],["Francisco Aguilar (MTTO.)","Julio Torres"],["Ginno López","Gustavo Lozoya"]],
   3: [["Erick Bernal","Eduardo Rendon (Charro)"],["Alejandro Torres (Alex)","Adrián Méndez (Alemán)"],["Santos Chavez","Martín Barreto"],["Ramon","Miguelito"],["Cristian Pineda (Kity)","Héctor Pineda (Cagochi)"],["Rafael Figueroa Silva (Rafa)","Fernando (Pollo)"],["Cayetano (Caye)","Israel Peña"],["Matias","Kechis"],["Francisco Aguilar (MTTO.)","Francisco Negrete (Rioco)"],["Ginno López","Coliman"],["Gustavo Lozoya","Julio Torres"]],
   4: [["Erick Bernal","Alejandro Torres (Alex)"],["Santos Chavez","Eduardo Rendon (Charro)"],["Ramon","Adrián Méndez (Alemán)"],["Cristian Pineda (Kity)","Martín Barreto"],["Rafael Figueroa Silva (Rafa)","Miguelito"],["Cayetano (Caye)","Héctor Pineda (Cagochi)"],["Matias","Fernando (Pollo)"],["Francisco Aguilar (MTTO.)","Israel Peña"],["Ginno López","Kechis"],["Gustavo Lozoya","Francisco Negrete (Rioco)"],["Julio Torres","Coliman"]],
   5: [["Erick Bernal","Santos Chavez"],["Ramon","Alejandro Torres (Alex)"],["Cristian Pineda (Kity)","Eduardo Rendon (Charro)"],["Rafael Figueroa Silva (Rafa)","Adrián Méndez (Alemán)"],["Cayetano (Caye)","Martín Barreto"],["Matias","Miguelito"],["Francisco Aguilar (MTTO.)","Héctor Pineda (Cagochi)"],["Ginno López","Fernando (Pollo)"],["Gustavo Lozoya","Israel Peña"],["Julio Torres","Kechis"],["Coliman","Francisco Negrete (Rioco)"]],
   6: [["Erick Bernal","Ramon"],["Cristian Pineda (Kity)","Santos Chavez"],["Rafael Figueroa Silva (Rafa)","Alejandro Torres (Alex)"],["Cayetano (Caye)","Eduardo Rendon (Charro)"],["Matias","Adrián Méndez (Alemán)"],["Francisco Aguilar (MTTO.)","Martín Barreto"],["Ginno López","Miguelito"],["Gustavo Lozoya","Héctor Pineda (Cagochi)"],["Julio Torres","Fernando (Pollo)"],["Coliman","Israel Peña"],["Francisco Negrete (Rioco)","Kechis"]],
   7: [["Erick Bernal","Cristian Pineda (Kity)"],["Rafael Figueroa Silva (Rafa)","Ramon"],["Cayetano (Caye)","Santos Chavez"],["Matias","Alejandro Torres (Alex)"],["Francisco Aguilar (MTTO.)","Eduardo Rendon (Charro)"],["Ginno López","Adrián Méndez (Alemán)"],["Gustavo Lozoya","Martín Barreto"],["Julio Torres","Miguelito"],["Coliman","Héctor Pineda (Cagochi)"],["Francisco Negrete (Rioco)","Fernando (Pollo)"],["Kechis","Israel Peña"]],
   8: [["Erick Bernal","Rafael Figueroa Silva (Rafa)"],["Cayetano (Caye)","Cristian Pineda (Kity)"],["Matias","Ramon"],["Francisco Aguilar (MTTO.)","Santos Chavez"],["Ginno López","Alejandro Torres (Alex)"],["Gustavo Lozoya","Eduardo Rendon (Charro)"],["Julio Torres","Adrián Méndez (Alemán)"],["Coliman","Martín Barreto"],["Francisco Negrete (Rioco)","Miguelito"],["Kechis","Héctor Pineda (Cagochi)"],["Israel Peña","Fernando (Pollo)"]],
   9: [["Erick Bernal","Cayetano (Caye)"],["Matias","Rafael Figueroa Silva (Rafa)"],["Francisco Aguilar (MTTO.)","Cristian Pineda (Kity)"],["Ginno López","Ramon"],["Gustavo Lozoya","Santos Chavez"],["Julio Torres","Alejandro Torres (Alex)"],["Coliman","Eduardo Rendon (Charro)"],["Francisco Negrete (Rioco)","Adrián Méndez (Alemán)"],["Kechis","Martín Barreto"],["Israel Peña","Miguelito"],["Fernando (Pollo)","Héctor Pineda (Cagochi)"]]
//   10: [[]],
//   11: [[]],
//   12: [[]],
//   13: [[]],
//   14: [[]],
//   15: [[]],
//   16: [[]],
//   17: [[]],
//   18: [[]],
//   19: [[]],
//   20: [[]],
// 21: [[]]  
   
};

/*******************************************************
 * Guarda la jornada seleccionada en localStorage
 *******************************************************/
const selectJornada = document.getElementById("jornada");

// Cuando se cambie la jornada en el <select>, se guarda
selectJornada.addEventListener("change", () => {
  const jornadaSeleccionada = selectJornada.value;
  if (jornadaSeleccionada) {
    localStorage.setItem("numeroJornada", jornadaSeleccionada);
    console.log(`✅ Jornada ${jornadaSeleccionada} guardada en localStorage`);
  }
});


// -------- localStorage: datos acumulados por jugador --------
let stats = JSON.parse(localStorage.getItem("ligaStats")) || {};

// Asegurar que TODOS los jugadores existan en stats
jugadores.forEach(j => {
    if (!stats[j]) {
        stats[j] = { jj: 0, jg: 0, jp: 0, cf: 0, cc: 0 };
    }
});

/* ---------------------- FUNCIONES ------------------------ */

/**
 * cargarJornadas:
 * Llena el select #jornada con 1..21 y luego carga los partidos
 */
function cargarJornadas() {
    const selJornada = document.getElementById("jornada");
    selJornada.innerHTML = "";
    for (let i = 1; i <= 21; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = `Jornada ${i}`;
        selJornada.appendChild(opt);
    }
    cargarPartidos();
}

/**
 * cargarPartidos:
 * Llena el select #partido según la jornada seleccionada.
 */
function cargarPartidos() {
    const selJornada = document.getElementById("jornada").value;
    const selPartido = document.getElementById("partido");
    selPartido.innerHTML = "";

    if (jornadas[selJornada]) {
        jornadas[selJornada].forEach((p, i) => {
            const opt = document.createElement("option");
            opt.value = i;
            opt.textContent = `${p[0]} vs ${p[1]}`;
            selPartido.appendChild(opt);
        });
    } else {
        const opt = document.createElement("option");
        opt.value = -1;
        opt.textContent = "Jornada vacía";
        selPartido.appendChild(opt);
    }
    actualizarLabels();
}

/**
 * actualizarLabels:
 * muestra los nombres del partido seleccionado debajo de los inputs
 */
function actualizarLabels() {
    const selJornada = document.getElementById("jornada").value;
    const selPartido = document.getElementById("partido").value;
    if (jornadas[selJornada] && selPartido >= 0) {
        const [j1, j2] = jornadas[selJornada][selPartido];
        document.getElementById("lblJugador1").textContent = j1;
        document.getElementById("lblJugador2").textContent = j2;
    } else {
        document.getElementById("lblJugador1").textContent = "-";
        document.getElementById("lblJugador2").textContent = "-";
    }
}

/**
 * registrarResultado:
 * Graba resultado de un partido, actualiza stats y guarda en localStorage
 */
function registrarResultado() {
    const selJornada = document.getElementById("jornada").value;
    const selPartido = document.getElementById("partido").value;
    if (!jornadas[selJornada] || selPartido < 0) return;

    const [j1, j2] = jornadas[selJornada][selPartido];
    const c1 = parseInt(document.getElementById("carambolas1").value) || 0;
    const c2 = parseInt(document.getElementById("carambolas2").value) || 0;

    // Actualizar estadísticas acumuladas
    stats[j1].jj++; stats[j2].jj++;
    stats[j1].cf += c1; stats[j2].cf += c2;
    stats[j1].cc += c2; stats[j2].cc += c1;

    if (c1 > c2) { stats[j1].jg++; stats[j2].jp++; }
    else if (c2 > c1) { stats[j2].jg++; stats[j1].jp++; }

    // Guardar y refrescar tabla
    localStorage.setItem("ligaStats", JSON.stringify(stats));
    generarTabla();

//aqui

}




/**
 * generarTabla:
 * Crea la tabla visible en pantalla con SC/NC en texto (compatibles con PDF)
 */
function generarTabla() {
    const tbody = document.querySelector("#tablaEstadisticas tbody");
    tbody.innerHTML = "";

    // orden por puntos (jg) y luego por diferencia (cf-cc)
    const orden = Object.entries(stats).sort((a, b) => {
        const puntosB = b[1].jg, puntosA = a[1].jg;
        const difB = b[1].cf - b[1].cc, difA = a[1].cf - a[1].cc;
        return puntosB - puntosA || difB - difA;
    });

    orden.forEach(([nombre, s], i) => {
        const fila = document.createElement("tr");
        const dc = s.cf - s.cc;

        // SC/NC como texto para compatibilidad (SC para primeros 8)
        const scnc = i < 8 ? `<span class="sc">SC</span>` : `<span class="nc">NC</span>`;

        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${nombre}</td>
            <td>${s.jj}</td>
            <td>${s.jg}</td>
            <td>${s.jp}</td>
            <td>${s.cf}</td>
            <td>${s.cc}</td>
            <td>${dc}</td>
            <td>${scnc}</td>
            <td class="opciones">
                <button class="btnEditar" data-jugador="${nombre}" title="Editar">✏️</button>
                <button class="btnEliminar" data-jugador="${nombre}" title="Eliminar">🗑️</button>
            </td>
        `;
        tbody.appendChild(fila);
    });

    // Asignar los eventos a botones recién creados
    document.querySelectorAll(".btnEditar").forEach(btn => {
        btn.addEventListener("click", () => editarJugador(btn.dataset.jugador));
    });
    document.querySelectorAll(".btnEliminar").forEach(btn => {
        btn.addEventListener("click", () => eliminarJugador(btn.dataset.jugador));
    });

    document.getElementById("btnVerTablaPublica").addEventListener("click", () => {
    // Redirige a la página pública
    window.location.href = "../billar-html/tabla-liga1.html";
    });



    /* 🔹 NUEVO BLOQUE: Guarda el HTML actual de la tabla sin la columna de opciones */
    const tabla = document.querySelector("#tablaEstadisticas").cloneNode(true);
    tabla.querySelectorAll("th:last-child, td:last-child").forEach(el => el.remove());
    localStorage.setItem("tablaPosicionesHTML", tabla.outerHTML);


}

/* ---------- EDITAR Y ELIMINAR ------------ */
function editarJugador(nombre) {
    // Pedir valores nuevos (puede modificar según quiera UI más amigable)
    const nuevaCF = prompt(`Carambolas a favor de ${nombre}:`, stats[nombre].cf);
    const nuevaCC = prompt(`Carambolas en contra de ${nombre}:`, stats[nombre].cc);
    const nuevoJG = prompt(`Juegos ganados de ${nombre}:`, stats[nombre].jg);
    const nuevoJP = prompt(`Juegos perdidos de ${nombre}:`, stats[nombre].jp);
    const nuevoJJ = prompt(`Juegos jugados de ${nombre}:`, stats[nombre].jj);

    if (nuevaCF !== null) stats[nombre].cf = parseInt(nuevaCF) || 0;
    if (nuevaCC !== null) stats[nombre].cc = parseInt(nuevaCC) || 0;
    if (nuevoJG !== null) stats[nombre].jg = parseInt(nuevoJG) || 0;
    if (nuevoJP !== null) stats[nombre].jp = parseInt(nuevoJP) || 0;
    if (nuevoJJ !== null) stats[nombre].jj = parseInt(nuevoJJ) || 0;

    localStorage.setItem("ligaStats", JSON.stringify(stats));
    generarTabla();
}

function eliminarJugador(nombre) {
    if (confirm(`¿Eliminar a ${nombre} de la tabla?`)) {
        delete stats[nombre];
        localStorage.setItem("ligaStats", JSON.stringify(stats));
        generarTabla();
    }
}

/* ------------- EXPORTAR PDF ------------- */
/**
 * generarPrintableNode(jornada):
 * Crea un nodo DOM temporal que contiene logo + título + fecha + tabla clonada (sin columna Opciones)
 * Devuelve el nodo (elemento div) que se usará para html2pdf/html2canvas
 */
function generarPrintableNode(jornadaSeleccionada) {
    // Cabecera con logo y titulo
    const wrapper = document.createElement("div");
    wrapper.style.width = "100%";
    wrapper.style.background = "#ffffff";
    wrapper.style.color = "#000";
    wrapper.style.padding = "12px";
    wrapper.style.boxSizing = "border-box";
    wrapper.style.fontFamily = "Arial, Helvetica, sans-serif";

    // Header (logo + titulo)
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.marginBottom = "6px";

    // Logo (usa la ruta relativa; desde estadisticas.html es ../billar-img/logo1.jpg)
    const logo = document.createElement("img");
    logo.src = "../billar-img/logo1.jpg";
    logo.alt = "Logo";
    logo.style.height = "60px";
    logo.style.objectFit = "contain";

    // Título central
    const titulo = document.createElement("div");
    titulo.innerHTML = `<div style="text-align:center;">
        <div style="font-weight:800; font-size:18px;">TABLA DE LA JORNADA ${jornadaSeleccionada}</div>
        <div style="font-size:11px; margin-top:6px;">${new Date().toLocaleDateString()}</div>
    </div>`;

    header.appendChild(logo);
    header.appendChild(titulo);

    wrapper.appendChild(header);

    // Clonar la tabla visible y eliminar la última columna (Opciones)
    const tablaOriginal = document.getElementById("tablaEstadisticas");
    const tablaClon = tablaOriginal.cloneNode(true);

    // Quitar la columna Opciones (última)
    tablaClon.querySelectorAll("th:last-child, td:last-child").forEach(el => el.remove());

    // Estilizar la tabla clonada (para asegurar apariencia en PDF/JPG)
    tablaClon.style.borderCollapse = "collapse";
    tablaClon.style.width = "100%";
    tablaClon.querySelectorAll("th, td").forEach(cell => {
        cell.style.border = "1px solid #e6eef6";
        cell.style.padding = "8px";
        cell.style.fontSize = "12px";
    });

    // Encabezado azul similar al CSS (para PDF)
    tablaClon.querySelectorAll("thead th").forEach(th => {
        th.style.background = "#0a77b7";
        th.style.color = "#fff";
        th.style.fontWeight = "700";
    });

    wrapper.appendChild(tablaClon);
    return wrapper;
}








/**
 * generarPDF:
 * Usa html2pdf para convertir el nodo temporal en PDF (landscape)
 */
function generarPDF() {
    const jornadaSel = document.getElementById("jornada").value || 1;
    const node = generarPrintableNode(jornadaSel);

    const opt = {
        margin: [20, 15, 20, 15],
        filename: `tabla_jornada_${jornadaSel}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "pt", format: "a4", orientation: "landscape" }
    };

    html2pdf().set(opt).from(node).save();
}



/* ------------- EXPORTAR JPG ------------- */
/**
 * generarJPG:
 * Usa html2canvas para tomar la misma estructura y descargar como JPG
 */
function generarJPG() {
    const jornadaSel = document.getElementById("jornada").value || 1;
    const node = generarPrintableNode(jornadaSel);

    // Debemos agregar node al DOM (fuera de la vista) para que html2canvas pueda renderizarlo correctamente
    node.style.position = "fixed";
    node.style.left = "-9999px";
    document.body.appendChild(node);

    // html2canvas con escala para mayor resolución
    html2canvas(node, { scale: 2, useCORS: true }).then(canvas => {
        // Convertir canvas a imagen JPEG
        const imgData = canvas.toDataURL("image/jpeg", 1.0);

        // Descargar
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `tabla_jornada_${jornadaSel}.jpg`;
        link.click();

        // Limpiar nodo temporal
        document.body.removeChild(node);
    }).catch(err => {
        console.error("Error generando JPG:", err);
        if (node.parentNode) document.body.removeChild(node);
        alert("Error generando JPG. Revisa la consola.");
    });
}


/* ------------------ EVENTOS & ARRANQUE ------------------ */
document.addEventListener("DOMContentLoaded", () => {
    // 1) cargar selects y tabla
    cargarJornadas();
    generarTabla();

    // 2) listeners para selects y botones
    document.getElementById("jornada").addEventListener("change", () => {
        cargarPartidos();
        // regenerar la tabla (al cambiar jornada se puede actualizar título en exports)
        generarTabla();
    });
    document.getElementById("partido").addEventListener("change", actualizarLabels);
    document.getElementById("btnRegistrar").addEventListener("click", () => {
        registrarResultado();
        // vaciar inputs para evitar doble registro accidental
        document.getElementById("carambolas1").value = 0;
        document.getElementById("carambolas2").value = 0;
    });

    document.getElementById("btnPDF").addEventListener("click", generarPDF);
    document.getElementById("btnJPG").addEventListener("click", generarJPG);

    document.getElementById("btnRegresar").addEventListener("click", () => {
        window.location.href = "../index.html"; // ajuste si su index está en otra ruta
    });

    document.getElementById("btnReiniciar").addEventListener("click", () => {
        if (confirm("¿Deseas reiniciar TODAS las estadísticas? Esto no se puede deshacer.")) {
            // reiniciar stats, guardar y regenerar
            jugadores.forEach(j => stats[j] = { jj: 0, jg: 0, jp: 0, cf: 0, cc: 0 });
            localStorage.setItem("ligaStats", JSON.stringify(stats));
            generarTabla();
        }
    });
});



