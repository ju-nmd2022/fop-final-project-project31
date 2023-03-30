const pointRadius = 5;
const minPointRadius = 1;
const maxPoints = 50;
let readingInput = false;
let points = [];

class Point {
  // An object that stores the mouse x and y value as well as its position in the points array.

  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.i = points.length;
  }

  draw() {
    push();

    // A number from 100 to 0 with the last item added to the array being 100
    let percentage = (this.i - points.length + maxPoints) / maxPoints;

    // Color the point a range between two values
    stroke(
      255 * percentage + 100,
      255 * percentage + 100,
      255 * percentage + 100
    );

    // Thickness of point based on the percentage
    strokeWeight(
      minPointRadius + percentage * (pointRadius - minPointRadius) * 2
    );

    // Curve for smoother lines
    if (this.i > 2) {
      curve(
        this.x,
        this.y,
        points[this.i - 1].x,
        points[this.i - 1].y,
        points[this.i - 2].x,
        points[this.i - 2].y,
        points[this.i - 2].x,
        points[this.i - 2].y
      );
    }
    pop();
  }

  collision() {
    let pixel = collisionImage.get(this.x, this.y);
    console.log(pixel);
    if (pixel[3] != 0) {
      alert("Object found at " + this.x + ", " + this.y);
      return true;
    }
    return false;
  }
}

function updateCursor() {
  // Create a new point and add it to the points array, then draw all points.

  points.push(new Point());

  for (let i = 0; i < points.length; i++) {
    if (points.length - i < maxPoints) points[i].draw();
  }
}

onmousedown = () => {
  readingInput = true;
};

onmouseup = () => {
  // Copies the graphics, then checks the collision for each point

  collisionImage.copy(
    pg,
    -pg.width / 2,
    -pg.height / 2,
    pg.width,
    pg.height,
    0,
    0,
    pg.width,
    pg.height
  );

  collisionImage.loadPixels();

  for (let i = 0; i < points.length; i++) {
    if (points.length - i < maxPoints) {
      if (points[i].collision()) break;
    }
  }

  readingInput = false;
  points = [];
};
