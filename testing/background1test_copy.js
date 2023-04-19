//Mechanics and idea behind was inspired by CodingTrain 10 minutes Starfield Challenge
// https://www.youtube.com/watch?v=17WoOqgXsRM

const numberOfAsteroids = 400;
let asteroids = [];

function setupBackground() {
  for (let i = 0; i < numberOfAsteroids; i++) {
    asteroids.push(
      new Asteroid(Math.random() * canvasWidth, Math.random() * canvasHeight)
    );
  }
}

class Asteroid {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.startingPosition = createVector(x, y);

    this.velocity = createVector(0, 0);

    this.ang = atan2(y - canvasHeight / 2, x - canvasWidth / 2);
  }

  isActive() {
    return onScreen(this.startingPosition.x, this.startingPosition.y);
  }

  update(acceleration) {
    this.velocity.x += cos(this.ang) * acceleration;
    this.velocity.y += sin(this.ang) * acceleration;

    this.startingPosition.x = this.position.x;
    this.startingPosition.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  draw() {
    push();
    const alpha = map(this.velocity.mag(), 0, 3, 0, 255);
    stroke(255, alpha);
    strokeWeight(0.5);
    line(
      this.position.x,
      this.position.y,
      this.startingPosition.x,
      this.startingPosition.y
    );
    pop();
  }
}

function drawBackground() {
  background(0);

  const acceleration = map(mouseX, 0, canvasWidth, 0.25, 0.2);

  asteroids = asteroids.filter((asteroid) => {
    asteroid.draw();
    asteroid.update(acceleration);
    return asteroid.isActive();
  });

  while (asteroids.length < numberOfAsteroids) {
    asteroids.push(
      new Asteroid(Math.random() * canvasWidth, Math.random() * canvasHeight)
    );
  }
}

function onScreen(x, y) {
  return x >= 0 && x <= canvasWidth && y >= 0 && y <= canvasHeight;
}
