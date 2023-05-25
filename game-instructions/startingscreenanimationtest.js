let angle = 0;
const canvasHeight = innerHeight;
const canvasWidth = innerWidth;

function preload() {
  img = loadImage("texture.png");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
}

function draw() {
  background("#1c1c1c");
  ambientLight(255);

  push();
  angle += 0.03;
  translate(530, 250, 10);

  rotateX(angle);
  rotateZ(angle * 0.63);
  rotateY(angle * 0.06);

  fill(0, 0, 255);
  normalMaterial();
  texture(img);
  box(500);
  pop();

  push();
  translate(-800, -350, 10);

  rotateX(angle);
  rotateZ(angle * 0.63);
  rotateY(angle * 0.06);

  fill(0, 0, 255);
  normalMaterial();
  texture(img);
  box(150);
  pop();
}
