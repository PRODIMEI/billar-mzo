const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const spinCanvas = document.getElementById("spinCanvas");
const spinCtx = spinCanvas.getContext("2d");

const powerBar = document.getElementById("powerBar");
const hitSound = document.getElementById("hitSound");

let mouseX=0;
let mouseY=0;

let aiming=false;
let pullDistance=0;

let score=0;

let spinX=0;
let spinY=0;
let draggingSpin=false;

const friction=0.992;
const cushionBounce=0.9;

const rail=40;

let playLeft,playRight,playTop,playBottom;

function resizeCanvas(){

canvas.width=canvas.clientWidth;
canvas.height=canvas.clientWidth/2;

playLeft=rail;
playTop=rail;
playRight=canvas.width-rail;
playBottom=canvas.height-rail;

resetBalls();

}

window.addEventListener("load",()=>{
resizeCanvas();
update();
spinLoop();
});

window.addEventListener("resize",resizeCanvas);

function createBall(x,y,color){

return{
x,
y,
radius:12,
dx:0,
dy:0,
mass:1,
color,
spinX:0,
spinY:0
};

}

const whiteBall=createBall(0,0,"white");
const yellowBall=createBall(0,0,"yellow");
const redBall=createBall(0,0,"red");

const balls=[whiteBall,yellowBall,redBall];

function resetBalls(){

whiteBall.x=canvas.width*0.25;
whiteBall.y=canvas.height*0.5;

yellowBall.x=canvas.width*0.75;
yellowBall.y=canvas.height*0.35;

redBall.x=canvas.width*0.75;
redBall.y=canvas.height*0.65;

}

function drawTable(){

ctx.fillStyle="#3a2618";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#0b5e2b";

ctx.fillRect(
playLeft,
playTop,
canvas.width-rail*2,
canvas.height-rail*2
);

drawDiamonds();

}

function drawDiamonds(){

ctx.fillStyle="#f0e6c8";

const w=canvas.width-rail*2;
const h=canvas.height-rail*2;

for(let i=0;i<=8;i++){

let x=playLeft+(w/8)*i;

drawDiamond(x,rail/2);
drawDiamond(x,canvas.height-rail/2);

}

for(let i=0;i<=4;i++){

let y=playTop+(h/4)*i;

drawDiamond(rail/2,y);
drawDiamond(canvas.width-rail/2,y);

}

}

function drawDiamond(x,y){

ctx.beginPath();
ctx.moveTo(x,y-5);
ctx.lineTo(x+5,y);
ctx.lineTo(x,y+5);
ctx.lineTo(x-5,y);
ctx.fill();

}

function drawBall(ball){

ctx.beginPath();
ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
ctx.fillStyle=ball.color;
ctx.fill();

}

function drawCue(){

if(!aiming)return;

const dx=mouseX-whiteBall.x;
const dy=mouseY-whiteBall.y;

const angle=Math.atan2(dy,dx);

const startX=whiteBall.x-Math.cos(angle)*(20+pullDistance);
const startY=whiteBall.y-Math.sin(angle)*(20+pullDistance);

const endX=whiteBall.x-Math.cos(angle)*(160+pullDistance);
const endY=whiteBall.y-Math.sin(angle)*(160+pullDistance);

ctx.beginPath();
ctx.moveTo(startX,startY);
ctx.lineTo(endX,endY);

ctx.lineWidth=6;
ctx.strokeStyle="#caa472";
ctx.stroke();

}

function updateBall(ball){

ball.x+=ball.dx;
ball.y+=ball.dy;

ball.dx*=friction;
ball.dy*=friction;

if(ball.x<playLeft+ball.radius){
ball.x=playLeft+ball.radius;
ball.dx*=-cushionBounce;
}

if(ball.x>playRight-ball.radius){
ball.x=playRight-ball.radius;
ball.dx*=-cushionBounce;
}

if(ball.y<playTop+ball.radius){
ball.y=playTop+ball.radius;
ball.dy*=-cushionBounce;
}

if(ball.y>playBottom-ball.radius){
ball.y=playBottom-ball.radius;
ball.dy*=-cushionBounce;
}

if(Math.abs(ball.dx)<0.02)ball.dx=0;
if(Math.abs(ball.dy)<0.02)ball.dy=0;

}

function resolveCollision(b1,b2){

const dx=b2.x-b1.x;
const dy=b2.y-b1.y;

const dist=Math.hypot(dx,dy);

if(dist<b1.radius+b2.radius){

hitSound.currentTime=0;
hitSound.play();

const nx=dx/dist;
const ny=dy/dist;

const overlap=b1.radius+b2.radius-dist;

b1.x-=nx*overlap/2;
b1.y-=ny*overlap/2;

b2.x+=nx*overlap/2;
b2.y+=ny*overlap/2;

const p=2*(
b1.dx*nx+b1.dy*ny-
b2.dx*nx-b2.dy*ny
)/(b1.mass+b2.mass);

b1.dx-=p*b2.mass*nx;
b1.dy-=p*b2.mass*ny;

b2.dx+=p*b1.mass*nx;
b2.dy+=p*b1.mass*ny;

score++;
document.getElementById("score").textContent=score;

}

}

function moving(){

return balls.some(b=>
Math.abs(b.dx)>0.05||Math.abs(b.dy)>0.05
);

}

function shoot(){

const dx=mouseX-whiteBall.x;
const dy=mouseY-whiteBall.y;

const angle=Math.atan2(dy,dx);

const power=pullDistance*0.2;

whiteBall.dx=Math.cos(angle)*power*1.6;
whiteBall.dy=Math.sin(angle)*power*1.6;

}

canvas.addEventListener("mousedown",()=>{

if(!moving())aiming=true;

});

canvas.addEventListener("mousemove",e=>{

const rect=canvas.getBoundingClientRect();

mouseX=e.clientX-rect.left;
mouseY=e.clientY-rect.top;

if(aiming){

const dist=Math.hypot(mouseX-whiteBall.x,mouseY-whiteBall.y);

pullDistance=Math.min(dist,120);

powerBar.style.width=(pullDistance*0.8)+"%";

}

});

canvas.addEventListener("mouseup",()=>{

if(aiming){

shoot();

aiming=false;
pullDistance=0;
powerBar.style.width="0%";

}

});

function update(){

ctx.clearRect(0,0,canvas.width,canvas.height);

drawTable();

balls.forEach(updateBall);

for(let i=0;i<balls.length;i++){

for(let j=i+1;j<balls.length;j++){

resolveCollision(balls[i],balls[j]);

}

}

balls.forEach(drawBall);

drawCue();

requestAnimationFrame(update);

}

function drawSpinSelector(){

spinCtx.clearRect(0,0,spinCanvas.width,spinCanvas.height);

spinCtx.beginPath();
spinCtx.arc(75,75,60,0,Math.PI*2);
spinCtx.fillStyle="white";
spinCtx.fill();
spinCtx.stroke();

spinCtx.beginPath();
spinCtx.arc(75+spinX,75+spinY,8,0,Math.PI*2);
spinCtx.fillStyle="red";
spinCtx.fill();

}

spinCanvas.addEventListener("mousedown",e=>{

draggingSpin=true;

});

spinCanvas.addEventListener("mousemove",e=>{

if(!draggingSpin)return;

const rect=spinCanvas.getBoundingClientRect();

let mx=e.clientX-rect.left;
let my=e.clientY-rect.top;

spinX=mx-75;
spinY=my-75;

});

spinCanvas.addEventListener("mouseup",()=>draggingSpin=false);

function spinLoop(){

drawSpinSelector();
requestAnimationFrame(spinLoop);

}
