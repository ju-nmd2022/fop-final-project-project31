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
    this.frame = 0;

    if (this.x > canvasWidth / 2) this.ang = -this.ang;
  }

  draw(canvas) {
    canvas.push();
    canvas.translate(this.x - canvasWidth / 2, this.y - canvasHeight / 2);

    canvas.rotateX(this.frame * 0.02);
    canvas.rotateY(this.frame * 0.02);

    canvas.stroke(this.r / 1.5, this.g / 1.5, this.b / 1.5);
    canvas.strokeWeight(2);
    canvas.ambientMaterial(this.r, this.g, this.b);

    canvas.box(this.size);

    this.frame++;

    canvas.reset();
    canvas.pop();
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
