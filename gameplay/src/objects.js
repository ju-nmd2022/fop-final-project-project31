let objects = [];
const defaultSize = 80;
const g = 0.05;
const maxObjects = 16;

class GameObject {
  constructor(x, y, r, g, b, size, texture) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.r = r;
    this.g = g;
    this.b = b;
    this.vel = -innerHeight / random(55, 78);
    this.ang = random(1, 3);
    this.frame = 0;
    this.texture = texture;

    if (this.x > canvasWidth / 2) this.ang = -this.ang;
  }

  movement() {
    if (this.vel < 0) this.vel *= 0.99;

    if (this.vel > 7) this.vel = 7;

    if (this.x + this.size >= canvasWidth || this.x <= this.size)
      this.ang = -this.ang;

    this.vel += g;
    this.y += this.vel;
    this.x += this.ang;
  }

  checkCanvas() {
    // Checks if object is below the canvas
    if (this.y > canvasHeight + defaultSize * 2) {
      life--;
      objects.splice(this, 1);
    }

    if (life < 1 && mode != "mixed") {
      gameOver();
    }
  }
}

class Cone extends GameObject {
  constructor(x, y, r, g, b, size, texture) {
    super(x, y, r, g, b, size, texture);
    this.type = "cone";
  }
  draw(canvas) {
    canvas.push();
    canvas.translate(this.x - canvasWidth / 2, this.y - canvasHeight / 2);

    canvas.rotateX(this.frame * 0.02);
    canvas.rotateY(this.frame * 0.02);

    canvas.noStroke();
    canvas.fill(this.r, this.g, this.b);

    if (canvas == displayPG) {
      canvas.texture(this.texture);

      //canvas.ambientMaterial(this.r, this.g, this.b, 50);
    }

    canvas.cone(this.size / 1.4, this.size / 1.2);

    this.frame++;

    canvas.reset();
    canvas.pop();
  }
}

function updateObjects() {
  objects.forEach((i) => {
    i.movement();
    //canvases pg is the one i am detecking display pg is the ones i am actually seeing
    i.draw(pg);
    i.draw(displayPG);
  });

  objects.forEach((i) => {
    i.checkCanvas();
  });
}

class Cube extends GameObject {
  constructor(x, y, r, g, b, size, texture) {
    super(x, y, r, g, b, size, texture);
    this.type = "cube";
  }

  draw(canvas) {
    canvas.push();
    canvas.translate(this.x - canvasWidth / 2, this.y - canvasHeight / 2);

    canvas.rotateX(this.frame * 0.02);
    canvas.rotateY(this.frame * 0.02);

    canvas.noStroke();
    canvas.fill(this.r, this.g, this.b);

    if (canvas == displayPG) {
      canvas.texture(this.texture);
      //canvas.ambientMaterial(this.r, this.g, this.b);
      canvas.stroke(this.r / 1.5, this.g / 1.5, this.b / 1.5);
      canvas.noStroke();
    }

    canvas.box(this.size);

    this.frame++;

    canvas.reset();
    canvas.pop();
  }
}

class Bubble extends GameObject {
  constructor(x, y, r, g, b, size, texture) {
    super(x, y, r, g, b, size, texture);
    this.type = "bubble";
  }

  draw(canvas) {
    canvas.push();
    canvas.translate(this.x - canvasWidth / 2, this.y - canvasHeight / 2);

    canvas.noStroke();

    if (canvas == displayPG) {
      canvas.ambientMaterial(180, 220, 255);
      canvas.noStroke();
    } else {
      canvas.fill(this.r, this.g, this.b);
    }

    canvas.sphere(this.size / 1.5);

    this.frame++;

    canvas.reset();
    canvas.pop();
  }
}

function updateObjects() {
  objects.forEach((i) => {
    i.movement();
    i.draw(pg);
    i.draw(displayPG);
  });

  objects.forEach((i) => {
    i.checkCanvas();
  });
}

function createSlice(object) {
  // takes in object and pushes a number of smaller objects with the same properties
  // iterations how many times it goes through the for loop
  let iterations = 0;
  //that means that we put Cube object as a default one
  let objectType = Cube;

  switch (object.type) {
    case "cone":
      objectType = Cone;
      iterations = 1;
      break;

    case "cube":
      objectType = Cube;
      iterations = 2;
      break;

    case "bubble":
      objectType = Bubble;
      iterations = 0;
      break;

    default:
      break;
  }

  for (let i = 0; i < iterations; i++) {
    objects.push(
      new objectType(
        object.x,
        object.y,
        object.r,
        object.g,
        object.b,
        defaultSize / 1.8,
        object.texture
      )
    );
    objects[objects.length - 1].x += random(-20, 20);
    objects[objects.length - 1].y += random(-20, 20);
    objects[objects.length - 1].ang = random(-2, 2);
    objects[objects.length - 1].vel = random(-4, -8);
  }
}
