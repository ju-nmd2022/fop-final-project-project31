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

  // Creates cubes (temporary)
  setInterval(testFunction, 2000);
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
  // Updates movement then draws on the displayPG and pg canvas
  // displayPG is what the user will see while pg is used for detecting collision
  updateObjects();

  // Add lighting to the display canvas
  displayPG.ambientLight(30);
  displayPG.pointLight(40, 40, 40, -canvasWidth / 2, -canvasHeight / 2, 500);
  displayPG.pointLight(40, 40, 40, canvasWidth / 2, canvasHeight / 2, 500);

  // Draw canvas as an image
  image(displayPG, 0, 0);

  // Draw cursor
  if (readingInput) updateCursor();
}

function testFunction() {
  let r = Math.round(Math.random() * (255 - 50) + 50);
  let g = Math.round(Math.random() * (255 - 50) + 50);
  let b = Math.round(Math.random() * (255 - 50) + 50);

  if (objects.length >= maxObjects) return;

  objects.push(
    new Cube(
      random(defaultSize * 2, canvasWidth - defaultSize * 2),
      canvasHeight + defaultSize,
      r,
      g,
      b,
      defaultSize
    )
  );
}
