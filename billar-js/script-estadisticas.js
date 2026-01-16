/* ============================================================
   script-estadisticas.js
   - Maneja jornadas, registro de resultados, tabla de posiciones
   - Guarda en localStorage
   - Genera PDF y JPG con el mismo estilo (sin columna Opciones)
   ============================================================ */

/* -------- DATOS BASE -------- */
// Lista de jugadores (usted ya la tenía)
const jugadores = [
    "Francisco  Caballero (Cayayan)","Adrián Méndez (Alemán)","Erick Bernal","Cristian Pineda (Kity)","Ranulfo Catalan (Chalan)",
    "Eduardo Rendon  (Charro)","Benjamin Dimas (Caballo)","Francisco Aguilar (MTTO.)","Ginno López","Rafael  Figueroa Silva (Rafa)",
    "Santos Chavez","Rubén Jimenéz  (Yogui)","Martín Barreto","Héctor Pineda ( Cagochi )","Israel Peña","Julio Torres","Gustavo Lozoya",
    "Amado Romero (El May)","Francisco Negrete  (Rioco)","José Arteaga  (Comaye)","Fernando  (Pollo)","Don Pedrito Llamas"
];

// Jornadas (usted ya las definió hasta la 21)
const jornadas = {
  /* pegar aquí su objeto jornadas tal cual (omitido para brevedad en este bloque),
     pero en su archivo real debe estar completo tal como ya lo tiene */
  1: [["Don Pedrito Llamas","Francisco  Caballero  (Cayayan)"],["Adrián Méndez  (Alemán)","Fernando (Pollo)"],["Erick Bernal","José Arteaga  (Comaye)"],["Alejandro Torres  (Alex)","Francisco Negrete   (Rioco)"],["Ranulfo Catalan (Chalan)","Amado Romero (El May)"],["Eduardo Rendon (Charro)","Gustavo Lozoya"],[" (Duende)","Julio Torres"],["Francisco Aguilar (MTTO.)","Israel Peña"],["Ginno López","Héctor Pineda ( Cagochi )"],["Martín (Papis) x Rafa","Martín Barreto"],["Santos Chavez","Rubén Jimenéz  (Yogui)"]],
  2: [["Don Pedrito Llamas","Adrián Méndez  (Alemán)"],["Erick Bernal","Francisco  Caballero (Cayayan)"],["Alejandro Torres (Alex)","Fernando (Pollo)"],["Ranulfo Catalan (Chalan)","José Arteaga  (Comaye)"],["Eduardo Rendon (Charro)","Francisco Negrete (Rioco)"],["Benjamin Dimas (Caballo)","Amado Romero (El May)"],["Francisco Aguilar (MTTO.)","Gustavo Lozoya"],["Ginno López","Julio Torres"],["Martín (Papis) x Rafa","Israel Peña"],["Santos Chavez","Héctor Pineda (Cagochi)"],["Rubén Jimenéz  (Yogui)","Martín Barreto"]],
  3: [["Don Pedrito Llamas","Erick Bernal"],["Alejandro Torres  (Alex)","Adrián Méndez  (Alemán)"],["Ranulfo Catalan (Chalan)","Francisco  Caballero (Cayayan)"],["Eduardo Rendon (Charro)","Fernando (Pollo)"],["Benjamin Dimas (Caballo)","José Arteaga  (Comaye)"],["Francisco Aguilar (MTTO.)","Francisco Negrete (Rioco)"],["Ginno López","Amado Romero (El May)"],["Rafael  Figueroa Silva (Rafa)","Gustavo Lozoya "],["Santos Chavez","Julio Torres"],["Rubén Jimenéz  (Yogui)","Israel Peña"],["Martín Barreto","Héctor Pineda (Cagochi)"]],
  4: [["Don Pedrito Llamas","Alejandro Torres  (Alex)"],["Ranulfo Catalan (Chalan)","Erick Bernal"],["Eduardo Rendon (Charro)","Adrián Méndez  (Alemán)"],["Benjamin Dimas (Caballo)","Francisco  Caballero (Cayayan)"],["Francisco Aguilar (MTTO.)","Fernando (Pollo)"],["Ginno López","José Arteaga  (Comaye)"],["Martín (Papis) x Rafa","Francisco Negrete (Rioco)"],["Santos Chavez","Amado Romero (El May)"],["Rubén Jimenéz (Yogui)","Gustavo Lozoya"],["Martín Barreto","Julio Torres"],["Héctor Pineda (Cagochi)","Israel Peña"]],
  5: [["Don Pedrito Llamas","Ranulfo Catalan (Chalan)"],["Eduardo Rendon (Charro)","Cristian Pineda (Kity)"],["Benjamin Dimas (Caballo)","Erick Bernal"],["Francisco Aguilar (MTTO.)","Adrián Méndez  (Alemán)"],["Ginno López","Francisco  Caballero (Cayayan)"],["Rafael  Figueroa Silva (Rafa)","Fernando (Pollo)"],["Santos Chavez","José Arteaga (Comaye)"],["Rubén Jimenéz (Yogui)","Francisco Negrete (Rioco)"],["Martín Barreto","Amado Romero (El May)"],["Héctor Pineda (Cagochi)","Gustavo Lozoya"],["Israel Peña","Julio Torres"]],
  
   
  6: [["Alex","Erick"],["Franc. MTT.","Duende"],["Ginno","Charro"],["Pollo","Barreto"],["Cagochi","Aleman"],["Israel","Muertero"],["July","Rioco"],["Lozoya","La Comaye"],["El May","Papis"]],
  7: [["Alex","Franc. MTT."],["Ginno","Erick"],["Pollo","Duende"],["Cagochi","Charro"],["Israel","Barreto"],["July","Aleman"],["Lozoya","Muertero"],["El May","Rioco"],["Papis","La Comaye"]],
  8: [["Alex","Ginno"],["Pollo","Franc. MTT."],["Cagochi","Erick"],["Israel","Duende"],["July","Charro"],["Lozoya","Barreto"],["El May","Aleman"],["Papis","Muertero"],["La Comaye","Rioco"]],
  9: [["Alex","Pollo"],["Cagochi","Ginno"],["Israel","Franc. MTT."],["July","Erick"],["Lozoya","Duende"],["El May","Charro"],["Papis","Barreto"],["La Comaye","Aleman"],["Rioco","Muertero"]],
  10: [["Alex","Cagochi"],["Israel","Pollo"],["July","Ginno"],["Lozoya","Franc. MTT."],["El May","Erick"],["Papis","Duende"],["La Comaye","Charro"],["Rioco","Barreto"],["Muertero","Aleman"]],
  11: [["Alex","Israel"],["July","Cagochi"],["Lozoya","Pollo"],["El May","Ginno"],["Papis","Franc. MTT."],["La Comaye","Erick"],["Rioco","Duende"],["Muertero","Charro"],["Aleman","Barreto"]],
  12: [["Alex","July"],["Lozoya","Israel"],["El May","Cagochi"],["Papis","Pollo"],["La Comaye","Ginno"],["Rioco","Franc. MTT."],["Muertero","Erick"],["Aleman","Duende"],["Barreto","Charro"]],
  13: [["Alex","Lozoya"],["El May","July"],["Papis","Israel"],["La Comaye","Cagochi"],["Rioco","Pollo"],["Muertero","Ginno"],["Aleman","Franc. MTT."],["Barreto","Erick"],["Charro","Duende"]],
  14: [["Alex","El May"],["Papis","Lozoya"],["La Comaye","July"],["Rioco","Israel"],["Muertero","Cagochi"],["Aleman","Pollo"],["Barreto","Ginno"],["Charro","Franc. MTT."],["Duende","Erick"]],
  15: [["Alex","Papis"],["La Comaye","El May"],["Rioco","Lozoya"],["Muertero","July"],["Aleman","Israel"],["Barreto","Cagochi"],["Charro","Pollo"],["Duende","Ginno"],["Erick","Franc. MTT."]],
  16: [["Alex","La Comaye"],["Rioco","Papis"],["Muertero","El May"],["Aleman","Lozoya"],["Barreto","July"],["Charro","Israel"],["Duende","Cagochi"],["Erick","Pollo"],["Franc. MTT.","Ginno"]],
  17: [["Alex","Rioco"],["Muertero","La Comaye"],["Aleman","Papis"],["Barreto","El May"],["Charro","Lozoya"],["Duende","July"],["Erick","Israel"],["Franc. MTT.","Cagochi"],["Ginno","Pollo"]]
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
if (Object.keys(stats).length === 0) {
    jugadores.forEach(j => stats[j] = { jj: 0, jg: 0, jp: 0, cf: 0, cc: 0 });
}

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



