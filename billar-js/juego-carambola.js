const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const spinCanvas = document.getElementById("spinCanvas");
const spinCtx = spinCanvas.getContext("2d");

const powerBar = document.getElementById("powerBar");
const hitSound = document.getElementById("hitSound");

let mouseX = 0;
let mouseY = 0;

let aiming = false;
let pullDistance = 0;

let spinX = 0;
let spinY = 0;
let draggingSpin = false;

const friction = 0.992;
const cushionBounce = 0.9;

let rail;
let ballRadius;

let playLeft, playRight, playTop, playBottom;

// 🎯 CREAR BOLAS
function createBall(x, y, color) {
    return {
        x,
        y,
        radius: ballRadius,
        dx: 0,
        dy: 0,
        mass: 1,
        color
    };
}

let whiteBall = createBall(0, 0, "white");
let yellowBall = createBall(0, 0, "yellow");
let redBall = createBall(0, 0, "red");

let balls = [whiteBall, yellowBall, redBall];

// 📱 RESPONSIVE
function resizeCanvas() {

     const ratio = 1.95;
    
    const panelWidth = 100; // 🔥 espacio del panel lateral

    const screenWidth = window.innerWidth - panelWidth;
    const screenHeight = window.innerHeight;

   
   let width = screenWidth;
   let height = width / ratio;

    // 🔥 usar casi toda la pantalla ahora
    if (height > screenHeight * 0.9) {
        height = screenHeight * 0.9;
        width = height * ratio;
    }

    canvas.width = width;
    canvas.height = height;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    rail = canvas.width * 0.05;
    ballRadius = canvas.width * 0.015;

    playLeft = rail;
    playTop = rail;
    playRight = canvas.width - rail;
    playBottom = canvas.height - rail;

    // reposicionar bolas
    whiteBall.x = canvas.width * 0.25;
    whiteBall.y = canvas.height * 0.5;

    yellowBall.x = canvas.width * 0.75;
    yellowBall.y = canvas.height * 0.35;

    redBall.x = canvas.width * 0.75;
    redBall.y = canvas.height * 0.65;

    balls.forEach(b => b.radius = ballRadius);
}

window.addEventListener("load", () => {
    resizeCanvas();
    update();
    spinLoop();
});

window.addEventListener("resize", resizeCanvas);

// 🎱 MESA
function drawTable() {

    ctx.fillStyle = "#3a2618";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0b5e2b";
    ctx.fillRect(
        playLeft,
        playTop,
        canvas.width - rail * 2,
        canvas.height - rail * 2
    );

    drawDiamonds();
}

function drawDiamonds() {

    ctx.fillStyle = "#f0e6c8";

    const w = canvas.width - rail * 2;
    const h = canvas.height - rail * 2;

    for (let i = 0; i <= 8; i++) {
        let x = playLeft + (w / 8) * i;
        drawDiamond(x, rail / 2);
        drawDiamond(x, canvas.height - rail / 2);
    }

    for (let i = 0; i <= 4; i++) {
        let y = playTop + (h / 4) * i;
        drawDiamond(rail / 2, y);
        drawDiamond(canvas.width - rail / 2, y);
    }
}

function drawDiamond(x, y) {

    const size = rail * 0.15;

    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size, y);
    ctx.fill();
}

// 🎱 BOLAS
function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
}

// 🎱 TACO
function drawCue() {

    if (!aiming) return;

    const dx = mouseX - whiteBall.x;
    const dy = mouseY - whiteBall.y;

    const angle = Math.atan2(dy, dx);

    const startX = whiteBall.x - Math.cos(angle) * (ballRadius * 2 + pullDistance);
    const startY = whiteBall.y - Math.sin(angle) * (ballRadius * 2 + pullDistance);

    const endX = whiteBall.x - Math.cos(angle) * (ballRadius * 10 + pullDistance);
    const endY = whiteBall.y - Math.sin(angle) * (ballRadius * 10 + pullDistance);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);

    ctx.lineWidth = ballRadius * 0.5;
    ctx.strokeStyle = "#caa472";
    ctx.stroke();
}

// 🎱 FÍSICA
function updateBall(ball) {

    if (!isFinite(ball.x) || !isFinite(ball.y)) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 0;
        ball.dy = 0;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    ball.dx *= friction;
    ball.dy *= friction;

    if (ball.x < playLeft + ball.radius) {
        ball.x = playLeft + ball.radius;
        ball.dx *= -cushionBounce;
    }

    if (ball.x > playRight - ball.radius) {
        ball.x = playRight - ball.radius;
        ball.dx *= -cushionBounce;
    }

    if (ball.y < playTop + ball.radius) {
        ball.y = playTop + ball.radius;
        ball.dy *= -cushionBounce;
    }

    if (ball.y > playBottom - ball.radius) {
        ball.y = playBottom - ball.radius;
        ball.dy *= -cushionBounce;
    }

    if (Math.abs(ball.dx) < 0.02) ball.dx = 0;
    if (Math.abs(ball.dy) < 0.02) ball.dy = 0;
}

function drawGuideLine() {

    if (!aiming) return;

    const dx = mouseX - whiteBall.x;
    const dy = mouseY - whiteBall.y;

    const angle = Math.atan2(dy, dx);

    let dirX = Math.cos(angle);
    let dirY = Math.sin(angle);

    let startX = whiteBall.x;
    let startY = whiteBall.y;

    let hitBall = null;
    let hitX = 0;
    let hitY = 0;

    let minDist = Infinity;

    // 🔥 DETECTAR COLISIÓN CON OTRAS BOLAS
    balls.forEach(ball => {

        if (ball === whiteBall) return;

        const dx = ball.x - whiteBall.x;
        const dy = ball.y - whiteBall.y;

        const proj = dx * dirX + dy * dirY;

        if (proj <= 0) return;

        const closestX = whiteBall.x + dirX * proj;
        const closestY = whiteBall.y + dirY * proj;

        const dist = Math.hypot(ball.x - closestX, ball.y - closestY);

        if (dist < ball.radius * 2) {

            const collisionDist = proj - Math.sqrt((ball.radius * 2)**2 - dist**2);

            if (collisionDist < minDist) {
                minDist = collisionDist;
                hitBall = ball;

                hitX = whiteBall.x + dirX * collisionDist;
                hitY = whiteBall.y + dirY * collisionDist;
            }
        }
    });

    ctx.setLineDash([8, 6]);
    ctx.lineWidth = 2;

    // 🎯 SI HAY COLISIÓN CON BOLA
    if (hitBall) {

        // línea principal
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(hitX, hitY);
        ctx.strokeStyle = "white";
        ctx.stroke();

        // 🔥 PUNTO DE IMPACTO
        ctx.beginPath();
        ctx.arc(hitX, hitY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();

        // 🔥 DIRECCIÓN DE LA BOLA GOLPEADA
        const impactDx = hitBall.x - hitX;
        const impactDy = hitBall.y - hitY;

        const impactAngle = Math.atan2(impactDy, impactDx);

        const targetDirX = Math.cos(impactAngle);
        const targetDirY = Math.sin(impactAngle);

        ctx.beginPath();
        ctx.moveTo(hitBall.x, hitBall.y);
        ctx.lineTo(
            hitBall.x + targetDirX * 120,
            hitBall.y + targetDirY * 120
        );
        ctx.strokeStyle = "yellow";
        ctx.stroke();

        // 🔥 DIRECCIÓN DE LA BLANCA DESPUÉS DEL GOLPE
        const normalAngle = impactAngle + Math.PI / 2;

        ctx.beginPath();
        ctx.moveTo(hitX, hitY);
        ctx.lineTo(
            hitX + Math.cos(normalAngle) * 80,
            hitY + Math.sin(normalAngle) * 80
        );
        ctx.strokeStyle = "cyan";
        ctx.stroke();

    } else {

        // 🔥 SI NO HAY BOLA, DIBUJAR REBOTES
        let x = startX;
        let y = startY;

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let i = 0; i < 3; i++) {

            let tX = dirX > 0 
                ? (playRight - x) / dirX 
                : (playLeft - x) / dirX;

            let tY = dirY > 0 
                ? (playBottom - y) / dirY 
                : (playTop - y) / dirY;

            let t = Math.min(tX, tY);

            x += dirX * t;
            y += dirY * t;

            ctx.lineTo(x, y);

            if (t === tX) dirX *= -1;
            else dirY *= -1;
        }

        ctx.strokeStyle = "white";
        ctx.stroke();
    }

    ctx.setLineDash([]);
}
// 🎱 COLISIONES (ULTRA ESTABLE)
function resolveCollision(b1, b2) {

    let dx = b2.x - b1.x;
    let dy = b2.y - b1.y;

    let dist = Math.hypot(dx, dy);

    if (dist < 0.001) return;

    if (dist < b1.radius + b2.radius) {

        const nx = dx / dist;
        const ny = dy / dist;

        const overlap = (b1.radius + b2.radius) - dist;

        b1.x -= nx * overlap * 0.5;
        b1.y -= ny * overlap * 0.5;

        b2.x += nx * overlap * 0.5;
        b2.y += ny * overlap * 0.5;

        const kx = b1.dx - b2.dx;
        const ky = b1.dy - b2.dy;

        const p = 2 * (kx * nx + ky * ny) / 2;

        b1.dx -= p * nx;
        b1.dy -= p * ny;

        b2.dx += p * nx;
        b2.dy += p * ny;

        const max = 12;

        b1.dx = Math.max(-max, Math.min(max, b1.dx));
        b1.dy = Math.max(-max, Math.min(max, b1.dy));

        b2.dx = Math.max(-max, Math.min(max, b2.dx));
        b2.dy = Math.max(-max, Math.min(max, b2.dy));

        hitSound.currentTime = 0;
        hitSound.play();
    }
}

// 🎱 MOVIMIENTO
function moving() {
    return balls.some(b => Math.abs(b.dx) > 0.05 || Math.abs(b.dy) > 0.05);
}


// 🎱 DISPARO
function shoot() {

    const dx = mouseX - whiteBall.x;
    const dy = mouseY - whiteBall.y;

    const angle = Math.atan2(dy, dx);

    //const power = Math.min(pullDistance * 0.12, 10);
    const power = Math.min(pullDistance * 0.20, 16);

    whiteBall.dx = Math.cos(angle) * power;
    whiteBall.dy = Math.sin(angle) * power;
}

// 🎱 INPUT (PC + MÓVIL)
function getPos(e) {

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;

    if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
    };
}

canvas.addEventListener("mousedown", startAim);
canvas.addEventListener("touchstart", startAim);

function startAim() {
    if (!moving()) aiming = true;
}

canvas.addEventListener("mousemove", moveAim);
canvas.addEventListener("touchmove", moveAim);

function moveAim(e) {

    const pos = getPos(e);
    mouseX = pos.x;
    mouseY = pos.y;

    if (aiming) {
        const dist = Math.hypot(mouseX - whiteBall.x, mouseY - whiteBall.y);
        pullDistance = Math.min(dist, canvas.width * 0.2);

        powerBar.style.width = (pullDistance / (canvas.width * 0.2) * 100) + "%";
    }
}

canvas.addEventListener("mouseup", endAim);
canvas.addEventListener("touchend", endAim);

function endAim() {

    if (aiming) {
        shoot();
        aiming = false;
        pullDistance = 0;
        powerBar.style.width = "0%";
    }
}

// 🎱 LOOP
function update() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTable();

    balls.forEach(updateBall);

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            resolveCollision(balls[i], balls[j]);
        }
    }

    balls.forEach(drawBall);
    
    drawGuideLine(); // 👈 aquí
    
    drawCue();

    requestAnimationFrame(update);
}

// 🎯 SPIN
function drawSpinSelector() {

    spinCanvas.width = spinCanvas.clientWidth;
    spinCanvas.height = spinCanvas.clientHeight;

    const cx = spinCanvas.width / 2;
    const cy = spinCanvas.height / 2;
    const r = spinCanvas.width * 0.4;

    spinCtx.clearRect(0, 0, spinCanvas.width, spinCanvas.height);

    spinCtx.beginPath();
    spinCtx.arc(cx, cy, r, 0, Math.PI * 2);
    spinCtx.fillStyle = "white";
    spinCtx.fill();
    spinCtx.stroke();

    spinCtx.beginPath();
    spinCtx.arc(cx + spinX, cy + spinY, r * 0.15, 0, Math.PI * 2);
    spinCtx.fillStyle = "red";
    spinCtx.fill();
}

// eventos spin
spinCanvas.addEventListener("mousedown", () => draggingSpin = true);
spinCanvas.addEventListener("mouseup", () => draggingSpin = false);
spinCanvas.addEventListener("mousemove", moveSpin);

spinCanvas.addEventListener("touchstart", () => draggingSpin = true);
spinCanvas.addEventListener("touchend", () => draggingSpin = false);
spinCanvas.addEventListener("touchmove", moveSpin);

function moveSpin(e) {

    if (!draggingSpin) return;

    const rect = spinCanvas.getBoundingClientRect();

    let mx = e.touches ? e.touches[0].clientX : e.clientX;
    let my = e.touches ? e.touches[0].clientY : e.clientY;

    spinX = mx - rect.left - spinCanvas.width / 2;
    spinY = my - rect.top - spinCanvas.height / 2;

    const dist = Math.hypot(spinX, spinY);
    const max = spinCanvas.width * 0.3;

    if (dist > max) {
        spinX *= max / dist;
        spinY *= max / dist;
    }
}

function spinLoop() {
    drawSpinSelector();
    requestAnimationFrame(spinLoop);
}
