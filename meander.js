//to implement: point density
//
let meander = [];
let searchRadiusMult = 4.25; //4 ideal
let searchRadius; //defined by dPoint function (average dist * search radius)
let pIndex; //index of current point
let p1; //working point
let lineCloud = [];
let startPt;
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
  frameRate(5);
  createCanvas(windowHeight, windowHeight);
  totalChange = totalPoints;
  //colorMode(HSB, 100, 100, 100, 100);
  // Create Layout GUI
  gui = createGui('Variables').setPosition(windowHeight + 10, 20);
  gui.addGlobals('pointsOn');
  sliderRange(100, 400, 10);
  gui.addGlobals('totalPoints');
  sliderRange(1, 20, 1);
  gui.addGlobals('lineWeight');
  gui.addGlobals('lineColor', 'lineSaturation', 'backgroundColor', 'pointColor', );
  
  
  for (let i =0; i < totalPoints; i++) {
    meander.push(new Pts());
  }
  for(var m of meander) {
    m.update();
  }
  dPoints(meander);
  findFirstPoint();
  removeOrig();
  for (let i = 0; i < totalPoints; i++) {
  findRemaining()
  }
  //console.log(lineCloud); 

}

function draw() {
  //console.log(pointsOn);
  background(backgroundColor);
  if (totalPoints != totalChange) {
  //totalChange = totalPoints;
    meander =[];
    lineCloud =[];
    q = 0;
    setup();
    redraw();
    } 
  for(var m of meander) {
    m.display();
  }
  //drawLine();
  strokeWeight(lineWeight);
  stroke(lineColor);
  noFill();
  beginShape()
  //vertex(startPt.x, startPt.y);
  
  for (let i=1; i < q; i++){
    px = lineCloud[i].x;
    py = lineCloud[i].y;
    curveVertex(px, py)
  }
  endShape()
  //console.log(q);
  if (drawLine === true) {
  if (q < totalPoints) {
  q++;
  }
  }
}
class Pts {
  constructor() {
    this.pos = createVector(random(width),random(height));
    this.center = createVector(width/2, height/2);
  }
  update() {
    this.pos.x = random(width);
    this.pos.y = random(height);
    let test = this.center.dist(this.pos);
    if (circle == true) {
    if (test > width/2){
      this.update();
    }
    }
  }
  display() {
    
    stroke(pointColor);
  if (pointsOn === true) {
    strokeWeight(5);
  } else {
    noStroke();
  }
    point(this.pos.x, this.pos.y);
  
  }
}
//finds the average distance between each point and the nearest four points
function dPoints(x) {
  let averageD;
  let ptsLoc = [];
  let averageDLoc = [];
  for (let i = 0; i < x.length; i++) {
    ptsLoc.push(x[i].pos);
    
  }
  for (var p of ptsLoc) {
      let distancePts = [];
  for (let j = 0; j < ptsLoc.length; j++) {
    //if(p != j) {
    distancePts.push(p.dist(ptsLoc[j]));
    distancePts.sort( (a, b) => {return a-b; });
    //}
  }
   let firstFour = distancePts.slice(1,4);
   let sum = firstFour.reduce((x,y) => x += y);
   let averageDPt = sum/firstFour.length;
   averageDLoc.push(averageDPt);
    //console.log(firstFour);
  }
  let sum2 = averageDLoc.reduce((x,y) => x+=y);
  let averageLoc = sum2/averageDLoc.length;
  averageD = averageLoc;
  searchRadius = averageD * searchRadiusMult;
  //console.log(searchRadius);
}
function findFirstPoint() {
  ptCloud = [...meander];
  let startPt = createVector(width/2, height -1);
  lineCloud.push(startPt);
  let distP1 = [];
  let searchDist = [];
  //find the first point
  for (let i = 0; i < ptCloud.length; i ++) {
    let testDist = startPt.dist(ptCloud[i].pos);
      if (testDist != 0 && testDist < searchRadius) {
        searchDist.push({key: i, value: ptCloud[i].pos.y})
        }
      }
  let low = 0;
    for (let i=0; i < searchDist.length; i++){
      if (searchDist[i].value > searchDist[low].value){
        low = i;
      }
    }  
  pIndex = searchDist[low].key;
  p1 =ptCloud[pIndex];
  //push to array for line drawing
  lineCloud.push(p1);
  //set point to zero
  
}
function removeOrig() {
  p1 = ptCloud[pIndex].pos;
  ptCloud.splice(pIndex, 1);
}
function findRemaining() {
  let distP1 = [];
  let count = 0;
  let yVal = []
  //find remaining points
  var searchDist = [];
  for(let i = 0; i < ptCloud.length; i++) {
    let testDist2 = p1.dist(ptCloud[i].pos) 
    if (testDist2 != 0 && testDist2 < searchRadius) {
    searchDist.push({key: i, value: ptCloud[i].pos.y})
    yVal.push(ptCloud[i].pos.y);
    }
    
  }
  
  let lowest = Math.max(...yVal);
  for (let i = 0; i < searchDist.length; i++) {
    if(searchDist[i].value == lowest) {
      pIndex = searchDist[i].key;
      p1 = ptCloud[pIndex].pos;
    }
  }
  return removePt();
  //console.log(p1);
}
function removePt() {
  lineCloud.push(p1);
  //console.log(lineCloud, pIndex);
  ptCloud.splice(pIndex, 1);
}
function drawPoints() {
  lineCloud = [];
    q = 0;
    for(var m of meander) {
    m.update();
  }
  dPoints(meander);
  findFirstPoint();
  removeOrig();
  for (let i = 0; i < totalPoints; i++) {
  findRemaining()
  }
    redraw();
  }
function doubleClicked() {
if (drawLine === false) {
    drawLine = true
  } else {
    drawLine = false
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
  if (key === 'r' ) {
    drawPoints();
  }
  if (key === 'c' && circle == true ) {
    circle = false;
    drawPoints();
  } else if (key === 'c' && circle == false ) {
    circle = true;
    drawPoints();
  }
}
/*function touchStarted() {
  if (drawLine === false) {
    drawLine = true
  } else {
    drawLine = false
  }
  return false;
}*/

