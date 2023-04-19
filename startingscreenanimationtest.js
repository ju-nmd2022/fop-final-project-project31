let angle = 0;
 
function preload() {
    img = loadImage('music.jpg');
}
 
function setup() {
    createCanvas(800, 800, WEBGL);
}

function draw() {
    background(0, 0, 0);
    ambientLight(255);
    push();
    translate(10, 10, 10);
    rotateX(angle);
    rotateZ(angle * 0.63);
    rotateY(angle * 0.06);
    fill (0, 0, 255);
    normalMaterial();
    texture(img);
    box(200, 200, 200);
    push();
    angle += 0.05;
}