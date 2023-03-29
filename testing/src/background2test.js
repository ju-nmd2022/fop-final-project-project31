const numberOfStars = 250;
const distance = 35;
let stars = [];

class star {
  constructor() {
    this.x = random(canvasWidth);
    this.y = random(canvasHeight);
    this.r = random(1, 5);
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-1, 1);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.wrap();
  }

  wrap() {
    if (this.x > width) this.x = 0;
    if (this.y > height) this.y = 0;
    if (this.x < 0) this.x = width;
    if (this.y < 0) this.y = height;
  }

  draw() {
    bg.circle(this.x, this.y, this.r);
  }

  drawLines(stars) {
    for (let star of stars) {
      if (dist(this.x, this.y, star.x, star.y) < distance) {
        bg.stroke("rgba(255,255,255,0.2)");
        bg.line(this.x, this.y, star.x, star.y);
      }
    }
  }
}

for (let i = 0; i < numberOfStars; i++) {
  stars.push(new star());
}

function drawBackground() {
  bg.background(0, 0, 0);
  bg.fill(255, 255, 255);
  for (let star of stars) {
    star.update();
    star.draw();
    star.drawLines(stars);
  }
  bg.reset();
}

for (let star of stars) {
  star.update();
  star.draw();
  star.drawLines(stars);
}
