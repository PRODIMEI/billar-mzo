/******************************************************
 * script-tabla-liga1.js
 * Versión que genera correctamente el PDF con encabezado, tabla y footer
 ******************************************************/

document.addEventListener("DOMContentLoaded", async () => {
    /***********************************************
     * 1️⃣ Recuperar tabla y título guardados
     ***********************************************/
    const tablaHTML = localStorage.getItem("tablaPosicionesHTML");
    const numeroJornada = localStorage.getItem("jornadaActual"); // ✅ Clave corregida
    const contenedor = document.getElementById("contenedorTablaLiga");
    const titulo = document.getElementById("tituloJornada");

    


    if (tablaHTML && contenedor) {
        contenedor.innerHTML = tablaHTML;

        // Eliminar última columna "Opciones"
        const filas = contenedor.querySelectorAll("tr");
        filas.forEach(fila => {
            const celdas = fila.querySelectorAll("th, td");
            if (celdas.length > 0) {
                celdas[celdas.length - 1].remove();
            }
        });
    }




    // ✅ Mostrar correctamente la jornada en el título
if (titulo) {
    if (numeroJornada) {
        titulo.textContent = `Tabla de la Jornada ${numeroJornada}`;
    } else {
        titulo.textContent = "Tabla de la Jornada 3";
    }
}

    /***********************************************
     * 2️⃣ Asegurar carga de html2canvas y jsPDF
     ***********************************************/
    if (typeof html2canvas === "undefined") {
        await import("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
    }
    if (typeof jspdf === "undefined") {
        await import("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    }

    /***********************************************
     * 3️⃣ Generar PDF visible (funciona con fondo oscuro)
     ***********************************************/
    const btnPDF = document.getElementById("btnPDF");
    if (btnPDF) {
        btnPDF.addEventListener("click", async () => {
            const { jsPDF } = window.jspdf;

            try {
                // Crear contenedor temporal blanco
                const area = document.createElement("div");
                area.style.background = "white";
                area.style.color = "black";
                area.style.padding = "30px";
                area.style.textAlign = "center";
                area.style.fontFamily = "Arial, sans-serif";
                area.style.width = "100%";
                area.style.maxWidth = "900px";
                area.style.margin = "0 auto";

                // Clonar encabezado, título, tabla y footer
                const encabezado = document.querySelector("header")?.cloneNode(true);
                const subtitulo = titulo?.cloneNode(true);
                const tabla = contenedor?.cloneNode(true);
                const footer = document.querySelector("footer")?.cloneNode(true);

                if (encabezado) area.appendChild(encabezado);
                if (subtitulo) area.appendChild(subtitulo);
                if (tabla) area.appendChild(tabla);
                if (footer) area.appendChild(footer);

                // Insertar temporalmente fuera de pantalla
                area.style.position = "fixed";
                area.style.top = "-9999px";
                document.body.appendChild(area);

                // Renderizar todo el contenido
                const canvas = await html2canvas(area, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff",
                    scrollY: -window.scrollY
                });

                const imgData = canvas.toDataURL("image/jpeg", 1.0);
                const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: "a4"
                });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = pageWidth - 20;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                // Manejar tablas grandes (varias páginas)
                let position = 10;
                if (imgHeight < pageHeight) {
                    pdf.addImage(imgData, "JPEG", 10, position, imgWidth, imgHeight);
                } else {
                    let heightLeft = imgHeight;
                    let y = 10;
                    pdf.addImage(imgData, "JPEG", 10, y, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                    while (heightLeft > 0) {
                        pdf.addPage();
                        y = heightLeft - imgHeight + 10;
                        pdf.addImage(imgData, "JPEG", 10, y, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }
                }

                pdf.save(`Tabla_Jornada_${numeroJornada || "5"}.pdf`);

                // Eliminar el clon temporal
                document.body.removeChild(area);
            } catch (err) {
                console.error("Error generando PDF:", err);
                alert("❌ Error generando el PDF. Revisa la consola.");
            }
        });
    }




    /***********************************************
 * Generar JPG (misma área que el PDF)
 * Colocar este bloque justo después del handler de btnPDF
 ***********************************************/
const btnJPG = document.getElementById("btnJPG");
if (btnJPG) {
    btnJPG.addEventListener("click", async () => {
        try {
            // Asegurar html2canvas cargado (si no se cargó ya)
            if (typeof html2canvas === "undefined") {
                await import("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
            }

            // Creamos un contenedor temporal semejante al usado para el PDF
            const area = document.createElement("div");
            area.style.background = "white";
            area.style.color = "black";
            area.style.padding = "30px";
            area.style.textAlign = "center";
            area.style.fontFamily = "Arial, sans-serif";
            area.style.width = "100%";
            area.style.maxWidth = "1200px"; // ancho mayor para mejor resolución
            area.style.margin = "0 auto";

            // Clonamos encabezado, titulo, tabla y footer (si existen)
            const encabezado = document.querySelector("header")?.cloneNode(true);
            const subtitulo = titulo?.cloneNode(true); // 'titulo' ya definido arriba
            const tabla = contenedor?.cloneNode(true);  // 'contenedor' ya definido arriba
            const footer = document.querySelector("footer")?.cloneNode(true);

            if (encabezado) area.appendChild(encabezado);
            if (subtitulo) area.appendChild(subtitulo);
            if (tabla) area.appendChild(tabla);
            if (footer) area.appendChild(footer);

            // Insertarlo fuera de la vista para que lo renderice
            area.style.position = "fixed";
            area.style.top = "-9999px";
            document.body.appendChild(area);

            // Renderizamos con html2canvas (scale para más nitidez)
            const canvas = await html2canvas(area, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                scrollY: -window.scrollY
            });

            // Convertir canvas a blob JPG y forzar descarga
            canvas.toBlob((blob) => {
                if (!blob) {
                    alert("Error generando la imagen JPG.");
                    document.body.removeChild(area);
                    return;
                }
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Tabla_Jornada_${numeroJornada || "X"}.jpg`;
                document.body.appendChild(a);
                a.click();
                // limpieza
                setTimeout(() => {
                    URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                }, 100);
            }, "image/jpeg", 0.95); // calidad 0.95

            // eliminar el clon temporal
            document.body.removeChild(area);

        } catch (err) {
            console.error("Error generando JPG:", err);
            alert("❌ Error generando la imagen JPG. Revisa la consola.");
        }
    });
}




    /***********************************************
     * 4️⃣ Botón Regresar
     ***********************************************/
    const btnRegresar = document.getElementById("btnRegresar");
    if (btnRegresar) {
        btnRegresar.addEventListener("click", () => window.history.back());
    }
});




    /* Botón para regresar
    document.getElementById("btnRegresarLiga").addEventListener("click", () => {
        window.location.href = "../billar-html/estadisticas.html";
    });
}); */

