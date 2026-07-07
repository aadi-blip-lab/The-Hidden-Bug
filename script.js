/* ==========================================================
   THE HIDDEN BUG
   Simple Working Version (Single File)
   Replace your entire script.js with this.
========================================================== */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");

let score = 0;
let best = Number(localStorage.getItem("hiddenBugBest") || 0);
bestEl.textContent = best;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

let time = 0;

const bug = {
    x: canvas.width * 0.5,
    y: canvas.height * 0.65,
    targetX: canvas.width * 0.5,
    targetY: canvas.height * 0.65,
    vx: 0,
    vy: 0,
    radius: 8
};

const grass = [];

for (let i = 0; i < 350; i++) {
    grass.push({
        x: Math.random() * canvas.width,
        h: 25 + Math.random() * 45,
        p: Math.random() * Math.PI * 2
    });
}

const clouds = [];

for (let i = 0; i < 3; i++) {
    clouds.push({
        x: Math.random() * canvas.width,
        y: 40 + Math.random() * 100,
        size: 30 + Math.random() * 25,
        speed: 0.15 + Math.random() * 0.2
    });
}

function randomBugTarget() {

    bug.targetX = 40 + Math.random() * (canvas.width - 80);

    bug.targetY = 120 + Math.random() * (canvas.height - 220);

}

randomBugTarget();

canvas.addEventListener("pointermove", e => {

    const d = Math.hypot(e.clientX - bug.x, e.clientY - bug.y);

if (d < 90) {

    const angle = Math.atan2(
        bug.y - e.clientY,
        bug.x - e.clientX
    );

    bug.targetX = bug.x + Math.cos(angle) * 180;
    bug.targetY = bug.y + Math.sin(angle) * 180;

}

});

canvas.addEventListener("pointerdown", e => {

    const d = Math.hypot(e.clientX - bug.x, e.clientY - bug.y);

    if (d < 28) {

        score++;

        scoreEl.textContent = score;

        if (score > best) {

            best = score;

            bestEl.textContent = best;

            localStorage.setItem("hiddenBugBest", best);

        }

        randomBugTarget();

        bug.x = bug.targetX;
        bug.y = bug.targetY;

    }

});

function updateBug() {

    const dx = bug.targetX - bug.x;
    const dy = bug.targetY - bug.y;

    bug.vx += dx * 0.002;
    bug.vy += dy * 0.002;

    bug.vx *= 0.95;
    bug.vy *= 0.95;

    bug.x += bug.vx;
    bug.y += bug.vy;

    if (Math.hypot(dx, dy) < 10) {

        randomBugTarget();

    }

}

function drawSky() {

    const g = ctx.createLinearGradient(0, 0, 0, canvas.height);

    g.addColorStop(0, "#edf7f3");
    g.addColorStop(1, "#b9cd9b");

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}

function drawClouds() {

    ctx.fillStyle = "rgba(255,255,255,.75)";

    clouds.forEach(c => {

        c.x += c.speed;

        if (c.x > canvas.width + 80) {

            c.x = -80;

        }

        ctx.beginPath();

        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.arc(c.x + c.size * .7, c.y + 5, c.size * .8, 0, Math.PI * 2);
        ctx.arc(c.x - c.size * .7, c.y + 5, c.size * .7, 0, Math.PI * 2);

        ctx.fill();

    });

}

function drawHill() {

    ctx.fillStyle = "#bccca9";

    ctx.beginPath();

    ctx.moveTo(0, canvas.height);

    ctx.quadraticCurveTo(
        canvas.width * .25,
        canvas.height * .45,
        canvas.width * .55,
        canvas.height * .65
    );

    ctx.quadraticCurveTo(
        canvas.width * .8,
        canvas.height * .5,
        canvas.width,
        canvas.height * .72
    );

    ctx.lineTo(canvas.width, canvas.height);

    ctx.fill();

}

function drawGrass() {

    ctx.strokeStyle = "#6f8d5d";

    grass.forEach(g => {

        const sway = Math.sin(time + g.p) * 4;

        ctx.beginPath();

        ctx.moveTo(g.x, canvas.height);

        ctx.quadraticCurveTo(
            g.x + sway,
            canvas.height - g.h * .5,
            g.x + sway * .4,
            canvas.height - g.h
        );

        ctx.stroke();

    });

}

function drawBug() {

    const flap = Math.sin(time * 12) * 0.8;

    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.beginPath();
    ctx.ellipse(
        bug.x,
        bug.y + 8,
        6,
        2.5,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Left Wing
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.beginPath();
    ctx.ellipse(
        bug.x - 5,
        bug.y - 2,
        4,
        2 + flap,
        -0.4,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Right Wing
    ctx.beginPath();
    ctx.ellipse(
        bug.x + 5,
        bug.y - 2,
        4,
        2 + flap,
        0.4,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Body
    ctx.fillStyle = "#202020";
    ctx.beginPath();
    ctx.ellipse(
        bug.x,
        bug.y,
        4,
        7,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.arc(
        bug.x,
        bug.y - 7,
        2,
        0,
        Math.PI * 2
    );
    ctx.fill();

}

function animate() {

    time += 0.03;

    drawSky();

    drawClouds();

    drawHill();

    drawGrass();

    updateBug();

   bug.y += Math.sin(time * 2) * 0.25;

   if (Math.random() < 0.002) {

    ctx.fillStyle = "rgba(120,150,90,0.6)";

    ctx.beginPath();

    ctx.ellipse(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.6,
        4,
        2,
        Math.random(),
        0,
        Math.PI * 2
    );

    ctx.fill();

}

    drawBug();

    requestAnimationFrame(animate);

}

animate();
