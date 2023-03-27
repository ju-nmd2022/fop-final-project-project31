//Mechanics and idea behind was inspired by CodingTrain 10 minutes Starfield Challenge
// https://www.youtube.com/watch?v=17WoOqgXsRM

const numberOfAsteroids = 700;
let asteroids = [];

function setup() {
  createCanvas(600, 600);
  stroke(255);
  strokeWeight(0.5);
  
  for(let i = 0; i < numberOfAsteroids; i ++) {
    asteroids.push(new Asteroid(random(width), random(height)));
  }
}

function draw() {
  background(0, 50);
  
  const acceleration = map(mouseX, 0, width, 0.25, 0.2);
  
  asteroids = asteroids.filter(asteroid => {
    asteroid.draw();
    asteroid.update(acceleration);
    return asteroid.isActive();
  });
  
  while(asteroids.length < numberOfAsteroids) {
    asteroids.push(new Asteroid(random(width), random(height)));
  }
}

class Asteroid {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.startingPosition = createVector(x, y);
    
    this.velocity = createVector(0, 0);
    
    this.ang = atan2(y - (height/2), x - (width/5));
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
    const alpha = map(this.velocity.mag(), 0, 3, 0, 255);
    stroke(255, alpha);
    line(this.position.x, this.position.y, this.startingPosition.x, this.startingPosition.y);
  }
}

function onScreen(x, y) {
  return x >= 0 && x <= width && y >= 0 && y <= height;  
}