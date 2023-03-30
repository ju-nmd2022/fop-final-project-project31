const canvasHeight = 800;
const canvasWidth = 800;
let pg;
let displayPG;
let collisionImage;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  pg = createGraphics(canvasWidth, canvasHeight, WEBGL);
  displayPG = createGraphics(canvasWidth, canvasHeight, WEBGL);
  collisionImage = createImage(canvasWidth, canvasHeight);

  frameRate(30);

  // Testing
  objects.push(new Cube(100, 100, 255, 0, 0, defaultSize));
  //objects.push(new Cube(300, 100, 0, 255, 0, defaultSize));
}

function draw() {
  // Clear canvases
  pg.clear();
  displayPG.clear();

  // Create graphics
  for (let i = 0; i < objects.length; i++) {
    objects[i].draw(pg);
    objects[i].draw(displayPG);
  }

  // Add lighting to canvas
  // displayPG uses the lighting the user sees while pg is a solid color for detecting collision
  pg.ambientLight(255);
  displayPG.ambientLight(30);
  displayPG.pointLight(40, 40, 40, -canvasWidth / 2, -canvasHeight / 2, 300);
  displayPG.pointLight(40, 40, 40, canvasWidth / 2, canvasHeight / 2, 300);

  // Create background
  background(0, 0, 0);

  // Draw canvases as images
  image(displayPG, 0, 0);

  // Draw cursor
  if (readingInput) updateCursor();
}
