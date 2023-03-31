const canvasHeight = 800;
const canvasWidth = 800;
let pg;
let displayPG;
let collisionImage;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  setupBackground();

  pg = createGraphics(canvasWidth, canvasHeight, WEBGL);
  displayPG = createGraphics(canvasWidth, canvasHeight, WEBGL);
  collisionImage = createImage(canvasWidth, canvasHeight);

  frameRate(40);

  // Testing
  objects.push(new Cube(100, 100, 255, 0, 0, defaultSize));
  objects.push(new Cube(300, 200, 0, 255, 0, defaultSize));
  objects.push(new Cube(500, 300, 0, 255, 0, defaultSize));
  objects.push(new Cube(200, 500, 0, 0, 255, defaultSize));
}

function draw() {
  // Clear canvases
  clear();
  pg.clear();
  displayPG.clear();

  // Create background
  drawBackground();

  // Sets pg background to black because transparency doesn't save so deleted objects will still trigger collision
  pg.background(0);

  // Create graphics
  // displayPG is what the user will see while pg is used for detecting collision
  for (let i = 0; i < objects.length; i++) {
    objects[i].draw(pg);
    objects[i].draw(displayPG);
  }

  // Add lighting to canvas
  // displayPG gets shading while pg is a solid color
  pg.ambientLight(255);
  displayPG.ambientLight(30);
  displayPG.pointLight(40, 40, 40, -canvasWidth / 2, -canvasHeight / 2, 500);
  displayPG.pointLight(40, 40, 40, canvasWidth / 2, canvasHeight / 2, 500);

  // Draw canvas as an image
  image(displayPG, 0, 0);

  // Draw cursor
  if (readingInput) updateCursor();
}
