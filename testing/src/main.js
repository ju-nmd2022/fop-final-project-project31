const canvasHeight = 800;
const canvasWidth = 800;
let pg;
//  let bg;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  pg = createGraphics(canvasWidth, canvasHeight, WEBGL);
  //bg = createGraphics(canvasWidth, canvasHeight, P2D);

  frameRate(30);

  // Testing
  objects.push(new Cube(100, 100, 255, 0, 0, defaultSize));
  //objects.push(new Cube(300, 100, 0, 255, 0, defaultSize));
}

function draw() {
  // Clear canvases
  pg.clear();
  console.log("Clear Graphic");
  //bg.clear();

  // Create graphics
  for (let i = 0; i < objects.length; i++) objects[i].draw();
  console.log("Drawing Objects");

  // Create background
  //drawBackground();
  background(0, 0, 0);

  // Draw canvases as images
  image(pg, 0, 0);
  //image(bg, 0, 0);

  // Draw cursor
  if (readingInput) updateCursor();
}
