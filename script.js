const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

window.addEventListener("resize",resize);
resize();

const grass=[];

for(let i=0;i<350;i++){

    grass.push({

        x:Math.random()*canvas.width,

        h:25+Math.random()*40,

        offset:Math.random()*Math.PI*2

    });

}

let time=0;

function drawSky(){

    const g=ctx.createLinearGradient(0,0,0,canvas.height);

    g.addColorStop(0,"#edf6f3");
    g.addColorStop(.55,"#dcefd9");
    g.addColorStop(1,"#b6c99a");

    ctx.fillStyle=g;
    ctx.fillRect(0,0,canvas.width,canvas.height);

}

function drawHills(){

    ctx.fillStyle="#b8c8a6";

    ctx.beginPath();

    ctx.moveTo(0,canvas.height);

    ctx.quadraticCurveTo(
        canvas.width*.25,
        canvas.height*.45,
        canvas.width*.5,
        canvas.height*.65
    );

    ctx.quadraticCurveTo(
        canvas.width*.75,
        canvas.height*.40,
        canvas.width,
        canvas.height*.65
    );

    ctx.lineTo(canvas.width,canvas.height);

    ctx.closePath();

    ctx.fill();

}

function drawGrass(){

    ctx.strokeStyle="#6f8d5c";
    ctx.lineWidth=1.2;

    grass.forEach(g=>{

        const sway=Math.sin(time+g.offset)*4;

        ctx.beginPath();

        ctx.moveTo(g.x,canvas.height);

        ctx.quadraticCurveTo(

            g.x+sway,

            canvas.height-g.h*.55,

            g.x+sway*.5,

            canvas.height-g.h

        );

        ctx.stroke();

    });

}

function animate(){

    time+=0.025;

    drawSky();

    drawHills();

    drawGrass();

    requestAnimationFrame(animate);

}

animate();
