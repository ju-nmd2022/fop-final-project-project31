let angle = 0;

function preload() {
    img = loadImage('texture.png');
}
 
function setup() {
    createCanvas(800, 800, WEBGL);
}

function draw() {
    background(0, 0, 0);
    ambientLight(255);
    push();
    angle += 0.03;
    translate(300, 300, 10);
    rotateX(angle);
    rotateZ(angle * 0.63);
    rotateY(angle * 0.06);
    fill (0, 0, 255);
    normalMaterial();
    texture(img);
    box(500);
    pop();
    push();
    translate(-400, -350, 10);
    rotateX(angle);
    rotateZ(angle * 0.63);
    rotateY(angle * 0.06);
    fill (0, 0, 255);
    normalMaterial();
    texture(img);
    box(150);
    pop();
    // push();
    // fill(255);
    // rect(-200, -200, 50, 90);
    // fill(255);
    // textSize(20);
    // textFont("Sarabun");
    // text("Press space to initiate the launching sequence...", 50, 70);
    // textSize(17);
    // pop();
}