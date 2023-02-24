var points = [];
var cubes = [];
var reading = false;
const cWidth = 500;
const cHeight = 500;
const cSize = 50;

function setup() {
  createCanvas(cWidth, cHeight);

  // Test cubes
  cubes.push(
    new Cube(random(cSize, cWidth - cSize), random(cSize, cHeight - cSize))
  );
  cubes.push(
    new Cube(random(cSize, cWidth - cSize), random(cSize, cHeight - cSize))
  );
  cubes.push(
    new Cube(random(cSize, cWidth - cSize), random(cSize, cHeight - cSize))
  );

  setInterval(update, 10);
}

class Point {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.i = points.length;
  }

  draw() {
    push();
    stroke(
      255 * (this.i / points.length) + 22,
      255 * (this.i / points.length) + 22,
      255 * (this.i / points.length) + 22
    );
    strokeWeight((this.i / points.length) * 8);
    line(this.x, this.y, points[this.i - 1].x, points[this.i - 1].y);
    pop();
  }

  collision() {
    for (let i = 0; i < cubes.length; i++) {
      if (
        this.x > cubes[i].x &&
        this.x < cubes[i].x + cubes[i].size &&
        this.y > cubes[i].y &&
        this.y < cubes[i].y + cubes[i].size
      ) {
        cubes.splice(i);
      }
    }
  }
}

class Cube {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = cSize;
  }

  draw() {
    push();
    noStroke();
    fill(255, 0, 0);
    rect(this.x, this.y, this.size);
    pop();
  }
}

onmousedown = () => {
  reading = true;
};

onmouseup = () => {
  for (let i = 0; i < points.length; i++) points[i].collision();

  reading = false;
  points = [];
};

// Reset button
onkeydown = () => {
  setup();
};

// Draw function
// Uses interval instead of draw for quicker updates (better drawing line)
function update() {
  background(22, 22, 22);

  for (let i = 0; i < cubes.length; i++) cubes[i].draw();

  if (reading) {
    points.push(new Point());

    for (let i = 1; i < points.length; i++) points[i].draw();
  }
}
