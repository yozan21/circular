import utils, { randomColor, randomIntFromRange } from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#00bdff", "#4d39ce", "#088eff"];

const gravity = 1;
const friction = 0.95;

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});
// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radian = Math.random() * Math.PI * 2;
    this.velocity = Math.random() * 0.01 + 0.03; //0.05;
    this.distanceFromCenter = randomIntFromRange(50, 120);
    this.lastMouse = { x: x, y: y };
  }
  draw(lastPoint) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  }
  update() {
    const lastPoint = { x: this.x, y: this.y };
    //Drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
    //Move points over time
    this.radian += this.velocity;
    this.x = this.lastMouse.x + Math.cos(this.radian) * this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radian) * this.distanceFromCenter;

    this.draw(lastPoint);
  }
}
//Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 40; i++) {
    const radius = Math.random() * 3 + 1;
    particles.push(
      new Particle(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        randomColor(colors)
      )
    );
  }
}

//animate
function animate() {
  requestAnimationFrame(animate);
  // c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "rgba(255, 255, 255,0.06)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  //Loop
  particles.forEach((particle) => {
    particle.update();
  });
}

init();
animate();
