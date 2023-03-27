function drawCube() {
  push();
  pg.angleMode(DEGREES);

  pg.stroke(255, 0, 0);
  pg.fill(0, 255, 255);

  pg.rotateX(3);
  pg.rotateY(4);
  pg.rotateZ(5);

  pg.box(100);
  pop();
}
