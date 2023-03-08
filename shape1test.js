//Testing out tutorial: https://www.youtube.com/watch?v=SGHWZz5Mrsw

let r = 0;

let thetaMaxSlider, phiMaxSlider;
let densitySlider;
let thetaMax, phiMax;
let density;

function setup(){
  createCanvas(700, 700, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB); //Hue, Saturation, Brightness
  stroke(321, 38, 80);
  strokeWeight(2);
  noFill();

  r = width/6;

  //Creation of a slider
  thetaMax = createDiv();
  thetaMax.class("valueDisplay");
  thetaMaxSlider = createSlider(0, 360, 360, 10);
  thetaMaxSlider.class("Slider");

  phiMax = createDiv();
  phiMax.class("valueDisplay");
  phiMaxSlider = createSlider(0, 180, 180, 10);
  phiMaxSlider.class("Slider");

  density = createDiv();
  density.class("valueDisplay");
  densitySlider = createSlider(13, 72, 36, 29); //Values accordingly: min, max, default, stepSize
  densitySlider.class("Slider");
}

function draw(){
  background(230, 50, 15);
  orbitControl(4, 4); //Allows you to control object with a mouse and rotate it

  rotateY(90);
  rotateZ(65);
  for(let phi = 0; phi < phiMaxSlider.value(); phi += 360/densitySlider.value()){
    beginShape();
    for(let theta = 0; theta < thetaMaxSlider.value(); theta += 360/densitySlider.value()){
      let x = r * cos(phi);
      let y = r * sin(phi) * sin(theta);
      let z = r * sin(phi) * cos(theta);
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }

  thetaMax.html("theta max value: " + thetaMaxSlider.value());
  phiMax.html("phi max value: " + phiMaxSlider.value());

  let mappedDensity = int(map(densitySlider.value(), 13, 72, 1, 60));

  density.html("Density: " + mappedDensity); //It allows us to display an object
}