const canvasHeight = 800;
const canvasWidth = 800;
let pg;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  pg = createGraphics(canvasWidth, canvasHeight, WEBGL);
  frameRate(30);
}

function draw() {
  // Clear graphics
  pg.clear();

  // Add graphics
  drawCube();

  // Background
  background(0, 0, 0);

  // Draw graphics as image
  image(pg, 0, 0);

  // Draw cursor
  if (readingInput) updateCursor();
}
