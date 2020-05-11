let randomPoints = [];
let spiralArray = [];
let searchRadiusMult = 4.25; //4 ideal
let searchRadius; //defined by dPoint function (average dist * search radius)
let pIndex; //index of current point
let lineCloud = [];
let ptCloud;
var totalPoints = 200;
let totalChange;
let q = 0;
let drawLine = false;
let c;
let circle = true;
//GUI Variables
var pointsOn = true;
var lineColor = '#00e0f0';
var pointColor = '#54595b';
var backgroundColor = '#0d0000';
var lineWeight = 7;

function setup() {
  frameRate(30);
  createCanvas(800, 800);
  totalChange = totalPoints;
  gui = createGui('Variables').setPosition(800 + 10, 20);
  gui.addGlobals('pointsOn');
  sliderRange(50, 400, 5);
  gui.addGlobals('totalPoints');
  sliderRange(1, 20, 1);
  gui.addGlobals('lineWeight');
  gui.addGlobals('lineColor', 'lineSaturation', 'backgroundColor', 'pointColor', );
  r = width/2;
  for (let i =0; i < totalPoints; i++) {
    randomPoints.push(new Pts());
  }
  for(var m of randomPoints) {
    m.update();
  }
}
function draw() {
  //noLoop();
  background(backgroundColor);
  noFill();
  //point(currentPoint.x, currentPoint.y);
  for(let k =0; k < randomPoints.length; k++) {
    randomPoints[k].display(k);
    //randomPoints[k].spiral(randomPoints);
    randomPoints[k].explosion();
  }
  if (totalChange != totalPoints) {
    newExplode();
    totalChange = totalPoints;
  }
beginShape()
  //vertex(spiralArray[0].pos.x, spiralArray[0].pos.y)
  for (let i=0; i <spiralArray.length; i++){
    px = spiralArray[i].pos.x;
    py = spiralArray[i].pos.y;
    vertex(px, py)
  }
//vertex(randomPoints[0].pos.x, randomPoints[0].pos.y)
endShape() 


}
class Pts {
  constructor() {
    this.pos = createVector(random(width),random(height));
    this.center = createVector(width/2, height/2);
    this.distCenter = 0;
    //this.distancePts = [];
    //this.closest = 22;
    //this.nearestPos = 0;
    this.avgDist = 0;
    this.order = 0;
    this.quadrant;
    this.add;
  }
  update() {
    this.pos.x = random(width);
    this.pos.y = random(height);
    let testForCircle = this.center.dist(this.pos);
    this.distCenter = testForCircle; 
    if (circle == true) {
    if (testForCircle > width/2){
      this.update();
    }
    }

  }
  display(number) {
    stroke(pointColor);
  if (pointsOn === true) {
    strokeWeight(10);
  } else {
    noStroke();
  }
    point(this.pos.x, this.pos.y);
  
  }

  explosion() {
    stroke(lineColor);
    strokeWeight(lineWeight);
    line(width/2, height/2, this.pos.x, this.pos.y)
  }
}
function keyTyped() {
  if (key === 's' ) {
    saveCanvas(c, 'myCanvas', 'jpg');
  }
  /*if (key === 'p' && pointsOn == true) {
    pointsOn = false;
  } else if (key === 'p' && pointsOn == false){
    pointsOn = true;
  }  */
  //if (key === 'r' ) {
    //setup();
  //}
  if (key === 'c' && circle == true ) {
    circle = false;
    drawPoints();
  } else if (key === 'c' && circle == false ) {
    circle = true;
    drawPoints();
  }
}
function newExplode() {
  randomPoints = [];
  spiralArray = [];

  for (let i =0; i < totalPoints; i++) {
    randomPoints.push(new Pts());
  }
  for(var m of randomPoints) {
    m.update();
  }
    redraw();
}
