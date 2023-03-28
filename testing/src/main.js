const canvasHeight = 800;
const canvasWidth = 800;
let pg;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  pg = createGraphics(canvasWidth, canvasHeight, WEBGL);
  frameRate(30);

  // Testing
  objects.push(new Cube(100, 100, 255, 0, 0, defaultSize));
  objects.push(new Cube(300, 100, 0, 255, 0, defaultSize));
}

function draw() {
  // Clear graphics
  pg.clear();

  // Add graphics
  for (let i = 0; i < objects.length; i++) objects[i].draw();

  // Background
  background(0, 0, 0);

  // Draw graphics as image
  image(pg, 0, 0);

  // Draw cursor
  if (readingInput) updateCursor();
}
