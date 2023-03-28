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
    let d = pg.pixelDensity();
    console.log(d);
    let img = createImage(canvasWidth, canvasHeight);
    img.copy(
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
    img.loadPixels();
    let alpha = (this.y * d * canvasWidth * d + this.x * d) * 4 + 3;
    console.log(this, alpha, img.pixels[alpha], img.get(this.x, this.y));
    if (img.get(this.x, this.y)[3] != 0) {
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
  // Iterate the points array and check for non-transparent pixels, then reset the array.

  readingInput = false;

  pg.loadPixels();
  console.log("Load Pixels");

  for (let i = 0; i < points.length; i++) {
    if (points.length - i < maxPoints) {
      if (points[i].collision()) break;
    }
  }
  //noLoop();

  points = [];
};
