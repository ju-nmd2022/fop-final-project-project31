let objects = [];
const defaultSize = 55;
const g = 0.1;

class Cube {
  constructor(x, y, r, g, b, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.r = r;
    this.g = g;
    this.b = b;
    this.vel = canvasHeight / random(-60, -45);
    this.ang = random(1, 3);
    this.type = "cube";

    if (this.x > canvasWidth / 2) this.ang = -this.ang;
  }

  draw() {
    pg.push();
    pg.translate(mouseX - canvasWidth / 2, mouseY - canvasHeight / 2);

    // pg.rotateX(frameCount * 0.04);
    // pg.rotateY(frameCount * 0.04);

    pg.noStroke();
    pg.fill(this.r, this.g, this.b);
    pg.box(this.size);
    pg.reset();
    pg.pop();
  }

  // movement() {
  //   if (this.vel < 0) this.vel *= 0.99;
  //   if (this.vel > 7) this.vel = 7;
  //   if (this.x + this.size >= canvasWidth || this.x <= 0) this.ang = -this.ang;

  //   this.vel += g;
  //   this.y += this.vel;
  //   this.x += this.ang;
  // }
}
