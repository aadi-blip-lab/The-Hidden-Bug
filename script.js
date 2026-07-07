const c=document.getElementById('game'),ctx=c.getContext('2d');
const scoreEl=document.getElementById('score'),bestEl=document.getElementById('best');
let score=0,best=+localStorage.bestBug||0;bestEl.textContent=best;
function rs(){c.width=innerWidth;c.height=innerHeight}addEventListener('resize',rs);rs();
const grass=[...Array(450)].map(()=>({x:Math.random()*c.width,h:25+Math.random()*45,p:Math.random()*6.28}));
const leaves=[...Array(8)].map(()=>({x:Math.random()*c.width,y:Math.random()*c.height*.5,s:0.2+Math.random()*0.4}));
const bug={x:c.width*.5,y:c.height*.65,a:0};
let t=0;
addEventListener('pointermove',e=>{
 let d=Math.hypot(e.clientX-bug.x,e.clientY-bug.y);
 if(d<60){bug.x=Math.random()*c.width;bug.y=120+Math.random()*(c.height-180);}
});
addEventListener('pointerdown',e=>{
 let d=Math.hypot(e.clientX-bug.x,e.clientY-bug.y);
 if(d<26){score++;scoreEl.textContent=score;if(score>best){best=score;localStorage.bestBug=best;bestEl.textContent=best;}
 bug.x=Math.random()*c.width;bug.y=120+Math.random()*(c.height-180);}
});
function draw(){
 t+=.03;
 let g=ctx.createLinearGradient(0,0,0,c.height);
 g.addColorStop(0,'#edf7f3');g.addColorStop(1,'#b7cb9b');
 ctx.fillStyle=g;ctx.fillRect(0,0,c.width,c.height);
 ctx.fillStyle='#bccba9';
 ctx.beginPath();ctx.moveTo(0,c.height);
 ctx.quadraticCurveTo(c.width*.25,c.height*.45,c.width,c.height*.72);
 ctx.lineTo(c.width,c.height);ctx.fill();
 ctx.strokeStyle='#6f8d5d';
 grass.forEach(b=>{let sw=Math.sin(t+b.p)*4;ctx.beginPath();ctx.moveTo(b.x,c.height);ctx.quadraticCurveTo(b.x+sw,c.height-b.h*.5,b.x+sw*.4,c.height-b.h);ctx.stroke();});
 ctx.fillStyle='rgba(120,140,90,.6)';
 leaves.forEach(l=>{l.x+=l.s;l.y+=Math.sin(t+l.x*.01)*.15;if(l.x>c.width+10){l.x=-10;l.y=Math.random()*c.height*.5;}ctx.beginPath();ctx.ellipse(l.x,l.y,4,2,0,0,6.28);ctx.fill();});
 bug.x+=Math.cos(t*.8+bug.a)*.45;bug.y+=Math.sin(t*.6+bug.a)*.25;
 ctx.fillStyle='#222';ctx.beginPath();ctx.arc(bug.x,bug.y,4,0,6.28);ctx.fill();
 requestAnimationFrame(draw);
}
draw();
