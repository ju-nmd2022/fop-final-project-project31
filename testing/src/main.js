const canvasHeight = innerHeight;
const canvasWidth = innerWidth;
let pg;
let displayPG;
let collisionImage;
let life;

let testImg;

function preload() {
  testImg = loadImage("./assets/texture.png");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  setupBackground();

  life = 5;

  pg = createGraphics(canvasWidth, canvasHeight, WEBGL);
  displayPG = createGraphics(canvasWidth, canvasHeight, WEBGL);
  collisionImage = createImage(canvasWidth, canvasHeight);

  frameRate(60);

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

  // Draw hearts
  for (let i = 0; i < life; i++) {
    drawHeart(canvasWidth / 1.2 + i * 40, 50);
  }

  // Draw cursor
  if (readingInput) updateCursor();
}

function testFunction() {
  let r = Math.round(Math.random() * (255 - 50) + 50);
  let g = Math.round(Math.random() * (255 - 50) + 50);
  let b = Math.round(Math.random() * (255 - 50) + 50);

  if (objects.length >= maxObjects) return;

  objects.push(
    new Cone(
      random(defaultSize * 2, canvasWidth - defaultSize * 2),
      canvasHeight + defaultSize,
      r,
      g,
      b,
      defaultSize,
      testImg
    )
  );
}

function drawHeart(x, y) {
  push();
  translate(x, y);
  fill(232, 12, 12);
  noStroke();
  beginShape();
  vertex(0, 0);
  bezierVertex(-10, -10, -20, 20 / 3, 0, 20);
  bezierVertex(20, 20 / 3, 10, -10, 0, 0);
  endShape();
  pop();
}

//create div that takes up the whole screen and is having some sort of an opacity so it fades and there is a button that you click and it restarts the whole thing
function gameOver() {
  const lostState = document.createElement("div");
  const contentElement = document.getElementById("content");

  lostState.setAttribute("id", "gameOver");

  const restartButton = document.createElement("button");
  restartButton.innerText = "Restart the Game";
  restartButton.addEventListener("click", () => {
    contentElement.innerHTML = "";
    setup();
  });
  lostState.appendChild(restartButton);

  contentElement.appendChild(lostState);
}
