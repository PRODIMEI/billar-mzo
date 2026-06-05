// ----------------- FONDO PLANETARIO NÍTIDO -----------------
const canvas = document.getElementById('fondoPlanetario');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Estrellas
const estrellas = [];
for (let i = 0; i < 200; i++) {
    estrellas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        dAlpha: Math.random() * 0.02
    });
}

// Estrellas fugaces
const fugaces = [];

// Planetas nítidos
const planetas = [];
for (let i = 0; i < 10; i++) {
    const radioOrbita = 80 + i * 70;
    const radioPlaneta = 8 + Math.random() * 12;
    planetas.push({
        angulo: Math.random() * 2 * Math.PI,
        radioOrbita,
        radioPlaneta,
        velocidad: 0.001 + Math.random() * 0.003,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        halo: radioPlaneta + 5,
        anillo: Math.random() < 0.4,
        rotAnillo: Math.random() * 2 * Math.PI
    });
}

// Dibujar estrellas
function dibujarEstrellas() {
    estrellas.forEach(e => {
        e.alpha += e.dAlpha;
        if (e.alpha <= 0 || e.alpha >= 1) e.dAlpha *= -1;

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${e.alpha})`;
        ctx.fill();
    });

    // Estrellas fugaces
    if (Math.random() < 0.01) {
        fugaces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.5,
            length: Math.random() * 80 + 50,
            speed: 8 + Math.random() * 4
        });
    }

    fugaces.forEach((f, idx) => {
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(f.x - f.length, f.y + f.length / 4);
        ctx.stroke();

        f.x += f.speed;
        f.y += f.speed / 4;
        if (f.x - f.length > canvas.width || f.y - f.length / 4 > canvas.height) {
            fugaces.splice(idx, 1);
        }
    });
}

// Dibujar planeta con halo y anillo
function dibujarPlaneta(p) {
    const px = canvas.width/2 + Math.cos(p.angulo) * p.radioOrbita;
    const py = canvas.height/2 + Math.sin(p.angulo) * p.radioOrbita;

    // Halo
    const gradient = ctx.createRadialGradient(px, py, p.radioPlaneta, px, py, p.radioPlaneta + p.halo);
    gradient.addColorStop(0, p.color);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(px, py, p.radioPlaneta + p.halo, 0, Math.PI * 2);
    ctx.fill();

    // Planeta
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(px, py, p.radioPlaneta, 0, Math.PI * 2);
    ctx.fill();

    // Anillo
    if (p.anillo) {
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(px, py, p.radioPlaneta + 8, p.radioPlaneta + 4, p.rotAnillo, 0, Math.PI * 2);
        ctx.stroke();
        p.rotAnillo += 0.002;
    }

    p.angulo += p.velocidad;
}

// Animación principal
function animarPlanetario() {
    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    dibujarEstrellas();
    planetas.forEach(dibujarPlaneta);

    requestAnimationFrame(animarPlanetario);
}
animarPlanetario();

// ----------------- PDF -----------------
document.getElementById('descargarPDF').addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p','mm','a4');
    const fotos = document.querySelectorAll('.card-foto img');
    const titulos = document.querySelectorAll('.card-foto h3');

    const margenX = 15;
    const anchoDisponible = 180;
    const altoFoto = 70;
    const espacioEntreFotos = 10;
    let y = 20;
    let fotosEnHoja = 0;

    for (let i = 0; i < fotos.length; i++) {
        const img = fotos[i];
        const titulo = titulos[i].innerText;
        const canvasImg = await cargarImagenEnCanvas(img.src);
        const imgData = canvasImg.toDataURL('image/jpeg', 1.0);

        if (fotosEnHoja === 3) {
            doc.addPage();
            y = 20;
            fotosEnHoja = 0;
        }

        doc.addImage(imgData, 'JPEG', margenX, y, anchoDisponible, altoFoto);
        doc.setFontSize(12);
        doc.text(titulo, 105, y + altoFoto + 7, { align: 'center' });

        y += altoFoto + espacioEntreFotos + 10;
        fotosEnHoja++;
    }

    doc.save('jornadas.pdf');
});

async function cargarImagenEnCanvas(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.onload = () => {
            const canvasTemp = document.createElement('canvas');
            canvasTemp.width = img.width;
            canvasTemp.height = img.height;
            canvasTemp.getContext('2d').drawImage(img, 0, 0);
            resolve(canvasTemp);
        };
    });
}
