// 2D Test

let readingInput = false;
let gameSpeed = 20;
const cWidth = 800;
const cHeight = 500;
const cSize = 55;
const g = 0.1;

let points = [];
const pointRadius = 5;
const minPointRadius = 2;
const maxPoints = 50;
let objects = [];
let slices = [];

const gr1 = { r: 0, g: 0, b: 0 };
const gr2 = { r: 0, g: 0, b: 0 };

// Test objects
let test = setInterval(() => {
  switch (round(random(1, 3))) {
    case 1:
      objects.push(
        new Cube(
          random(0.1 * cWidth, 0.9 * cWidth),
          cHeight,
          random(128, 255),
          random(128, 255),
          random(128, 255),
          cSize,
          "default"
        )
      );
      break;

    case 2:
      objects.push(
        new Bubble(
          random(0.1 * cWidth, 0.9 * cWidth),
          cHeight,
          random(128, 255),
          random(128, 255),
          random(128, 255),
          cSize
        )
      );
      break;

    case 3:
      objects.push(
        new Cube(
          random(0.1 * cWidth, 0.9 * cWidth),
          cHeight,
          255,
          0,
          0,
          cSize,
          "slowmotion"
        )
      );
      break;

    default:
      break;
  }
}, 50 * gameSpeed);

function setup() {
  createCanvas(cWidth, cHeight);
  frameRate(60);

  objects = [];
  points = [];
  slices = [];

  gr1.r = random(128, 255);
  gr1.g = random(128, 255);
  gr1.b = random(128, 255);
  gr2.r = random(0, 128);
  gr2.g = random(0, 128);
  gr2.b = random(0, 128);
}

class Point {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.i = points.length;
  }

  draw() {
    let percentage = (this.i - points.length + maxPoints) / maxPoints;

    push();
    stroke(
      gr1.r * percentage + gr2.r,
      gr1.g * percentage + gr2.g,
      gr1.b * percentage + gr2.b
    );
    //strokeWeight((this.i / points.length) * pointRadius * 2);
    strokeWeight(
      minPointRadius + percentage * (pointRadius - minPointRadius) * 2
    );
    if (this.i > 2) {
      curve(
        this.x,
        this.y,
        points[this.i - 1].x,
        points[this.i - 1].y,
        points[this.i - 2].x,
        points[this.i - 2].y,
        points[this.i - 2].x,
        points[this.i - 2].y
      );
    }
    pop();
  }

  collision() {
    for (let i = 0; i < objects.length; i++) {
      if (
        this.x + (this.i / points.length) * pointRadius > objects[i].x &&
        this.x - (this.i / points.length) * pointRadius <
          objects[i].x + objects[i].size &&
        this.y + (this.i / points.length) * pointRadius > objects[i].y &&
        this.y - (this.i / points.length) * pointRadius <
          objects[i].y + objects[i].size
      ) {
        if (objects[i].size == cSize) {
          const slice = {
            x: objects[i].x,
            y: objects[i].y,
            r: objects[i].r,
            g: objects[i].g,
            b: objects[i].b,
            type: objects[i].type,
            mode: objects[i].mode,
          };
          slices.push(slice);
        }

        objects.splice(i, 1);
      }
    }
  }
}

class Cube {
  constructor(x, y, r, g, b, size, mode) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.r = r;
    this.g = g;
    this.b = b;
    this.vel = cHeight / random(-60, -45);
    this.ang = random(1, 3);
    this.type = "cube";
    this.mode = mode;

    if (this.x > cWidth / 2) this.ang = -this.ang;
  }

  draw() {
    push();
    noStroke();
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.size);
    pop();
  }

  movement() {
    if (this.vel < 0) this.vel *= 0.99;
    if (this.vel > 7) this.vel = 7;
    if (this.x + this.size >= cWidth || this.x <= 0) this.ang = -this.ang;

    this.vel += g;
    this.y += this.vel;
    this.x += this.ang;
  }
}

class Bubble {
  constructor(x, y, r, g, b, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.r = r;
    this.g = g;
    this.b = b;
    this.vel = cHeight / random(-60, -45);
    this.ang = random(1, 3);
    this.type = "bubble";

    if (this.x > cWidth / 2) this.ang = -this.ang;
  }

  draw() {
    push();
    noStroke();
    fill(this.r, this.g, this.b);
    ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size);
    pop();
  }

  movement() {
    if (this.vel < 0) this.vel *= 0.99;
    if (this.vel > 7) this.vel = 7;
    if (this.x + this.size >= cWidth || this.x <= 0) this.ang = -this.ang;

    this.vel += g;
    this.y += this.vel;
    this.x += this.ang;
  }
}

onmousedown = () => {
  readingInput = true;
};

onmouseup = () => {
  points.map((point) => {
    if (point.i !== null) point.collision();
  });
  createSlices();
  readingInput = false;
  points = [];
  slices = [];
};

// Reset button
onkeydown = () => {
  setup();
};

// Draw function
function draw() {
  background(22, 22, 22);

  objects.map((i) => {
    i.movement();
    i.draw();
  });

  if (readingInput) {
    points.push(new Point());

    points.map((point) => {
      if (points.length - point.i > maxPoints) point.i = null;
      else point.draw();
    });
  }
}

// Updating movement
function objUpdate() {
  objects.map((i) => i.update());
}

// Creates all the smaller objects from the objects that were hit
function createSlices() {
  for (let i = 0; i < slices.length; i++) {
    switch (slices[i].type) {
      // Creates 1 to 4 smaller cubes from origin
      case "cube":
        if (slices[i].mode == "slowmotion") {
        } else {
          for (let j = 0; j < 2; j++) {
            objects.push(
              new Cube(
                random(slices[i].x, slices[i].x + cSize),
                random(slices[i].y, slices[i].y + cSize),
                slices[i].r,
                slices[i].g,
                slices[i].b,
                cSize / 1.8
              )
            );
            objects[objects.length - 1].vel = random(-1, -5);
            objects[objects.length - 1].ang = random(-2, 2);
          }
        }
        slices.splice(i, 0);
        break;

      case "bubble":
        objects.push(
          new Bubble(
            random(slices[i].x, slices[i].x + cSize),
            random(slices[i].y, slices[i].y + cSize),
            slices[i].r,
            slices[i].g,
            slices[i].b,
            cSize / 1.8
          )
        );
        objects[objects.length - 1].vel = random(-1, -5);
        objects[objects.length - 1].ang = random(-2, 2);

        slices.splice(i, 0);
        break;

      // Default
      default:
        break;
    }
  }
}
