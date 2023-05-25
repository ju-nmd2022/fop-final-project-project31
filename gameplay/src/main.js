const canvasHeight = innerHeight;
const canvasWidth = innerWidth;
let pg;
let displayPG;
let collisionImage;
let life;
let score;

let cubeTexture;
let bgGradient;

let mode = sessionStorage.getItem("mode");
let modes = {
  cube: Cube,
  bubble: Bubble,
  cone: Cone,
};

let backgroundColor;

function preload() {
  cubeTexture = loadImage("./assets/texture.png");
  bgGradient = loadImage("./assets/background-gradient.png");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  if (mode != "mixed") life = 5;
  score = 0;

  backgroundColor = {
    r: random(40, 80),
    g: random(40, 80),
    b: random(40, 80),
  };

  pg = createGraphics(canvasWidth, canvasHeight, WEBGL);
  displayPG = createGraphics(canvasWidth, canvasHeight, WEBGL);
  collisionImage = createImage(canvasWidth, canvasHeight);

  frameRate(60);

  // Back to menu button
  const textDiv = document.createElement("div");
  textDiv.classList.add("back-button");
  textDiv.innerHTML = "Back to main menu";
  textDiv.addEventListener("click", () => {
    window.location = "../index.html";
  });
  document.body.appendChild(textDiv);

  // Create object loop
  setInterval(createObjectLoop, 1500);
}

function draw() {
  // Clear canvases
  clear();
  pg.clear();
  displayPG.clear();

  // Create background
  background(backgroundColor.r, backgroundColor.g, backgroundColor.b);
  image(bgGradient, 0, 0);

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
    drawHeart(canvasWidth / 1.1, 50 + i * 60);
  }

  // Draw score
  drawScore();

  // Draw cursor
  if (readingInput) updateCursor();
}

// Gameplay loop
// Pushes a new object depending on which mode selected
function createObjectLoop() {
  let r = Math.round(Math.random() * (255 - 50) + 50);
  let g = Math.round(Math.random() * (255 - 50) + 50);
  let b = Math.round(Math.random() * (255 - 50) + 50);

  if (objects.length >= maxObjects) return;

  let tmp_mode = sessionStorage.getItem("mode");

  if (tmp_mode == "mixed") {
    tmp_mode = Object.keys(modes)[Math.round(random(0, 2))];
  }

  objects.push(
    new modes[tmp_mode](
      random(defaultSize * 2, canvasWidth - defaultSize * 2),
      canvasHeight + defaultSize,
      r,
      g,
      b,
      defaultSize
    )
  );
}

function drawHeart(x, y) {
  push();
  translate(x, y);
  scale(1.3);
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
  noLoop();

  const lostState = document.createElement("div");
  const contentElement = document.getElementById("content");

  lostState.setAttribute("id", "gameOver");

  const restartButton = document.createElement("button");
  // \n = new line
  restartButton.innerText = "YOU GOT\n" + score + " POINTS\n\nRESTART";
  restartButton.addEventListener("click", () => {
    contentElement.innerHTML = "";
    location.reload();
  });
  lostState.appendChild(restartButton);
  contentElement.appendChild(lostState);
}

function drawScore() {
  push();
  textFont("Tahoma");
  textStyle(BOLD);
  textSize(30);
  fill(255);
  noStroke();
  text(score, canvasWidth / 2, 70);
  pop();
}
