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

//new vars
var angle = 0;
var angle2 = 0;
let angleStart;
let increment = 0;
var averageDistance = 0;
let currentPoint;
let reductionArray;
let count;
let circleRadius = 0;
let quadrant = 1;
let l1;
let l2;

function setup() {
  frameRate(30);
  createCanvas(800, 800);
  totalChange = totalPoints;
  gui = createGui('Variables').setPosition(800 + 10, 20);
  gui.addGlobals('pointsOn');
  sliderRange(100, 400, 10);
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
    m.quadrant();
  }

// 1. Find furthest point
findFarthestPoint(randomPoints);

count = totalPoints - 1;
smallToLarge(randomPoints)
for (var q = 0; q < randomPoints.length; q++) {
  randomPoints[q].order = q;
}
averagePDistance(randomPoints, count)
reductionArray = [...randomPoints];
spiralArray.push(reductionArray[count])
//console.log(spiralArray);
reductionArray.splice(count, 1)
findAngle(spiralArray, 0)
findTan(spiralArray, 0);
}
function draw() {
  //noLoop();
  background(backgroundColor);
  noFill();
  point(currentPoint.x, currentPoint.y);
  for(let k =0; k < randomPoints.length; k++) {
    randomPoints[k].display(k);
    randomPoints[k].spiral(randomPoints);
    //randomPoints[k].explosion();
  }
//2. draw circle from through farthest point, with center at center of spiral
  drawOuterCircle(spiralArray, 0)

//3. draw line from center to last point added to circle
  let v1 = new p5.Vector.fromAngle(angle);
  let v2 = new p5.Vector(0, 0);
  let v3 = new p5.Vector.fromAngle(angle2);
  v1.setMag(circleRadius);
  v3.setMag(circleRadius);
  //v1.rotate(angle);
  currentPoint = createVector(v1.x + 400, v1.y + 400)
  //let nextPoint = createVector(v3.x + 400, v3.y + 400);
  //stroke(255, 0, 0)
  //strokeWeight(4);
  push();
  translate(width / 2 , height / 2);
  //line(v2.x, v2.y, v1.x, v1.y)
  //stroke(0, 255, 0);
  //line (v2.x, v2.y, v3.x, v3.y)
  pop();
  stroke(lineColor)
  strokeWeight(lineWeight);
  //ellipse(currentPoint.x, currentPoint.y, averageDistance * 2, averageDistance * 2)
  
  console.log(v1.angleBetween(v3));
  push();
  translate(currentPoint.x, currentPoint.y)
  rotate(angle);
  //rect(-averageDistance, 0, averageDistance, averageDistance)
  pop();
  
if(reductionArray.length != 0) {
  angle += increment;
  averagePDistance(randomPoints, count)
  nearestPoint(currentPoint, reductionArray);
  }
beginShape()
  for (let i=0; i <spiralArray.length; i++){
    px = spiralArray[i].pos.x;
    py = spiralArray[i].pos.y;
    vertex(px, py)
  }
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
    strokeWeight(5);
  } else {
    noStroke();
  }
    point(this.pos.x, this.pos.y);
  }
  quadrant() {
    if(this.pos.x > width/2 &&  this.pos.y > height/2) {
      this.quadrant = 1;
      this.add = 0;
      //return 1;
    } else if( this.pos.x < width/2 &&  this.pos.y >height/2) {
      this.quadrant = 2;
      this.add = PI / 2;
      //return 2;
    } else if( this.pos.x < width/2 &&  this.pos.y < height/2) {
      this.quadrant = 3;
      this.add = PI;
      //return 3;
    } else {
      this.quadrant = 4;
      this.add = 1.5 * PI;
      //return 4;
    }
  }
 
  spiral(points) {
    stroke(lineColor);
    strokeWeight(lineWeight)
    let v1 = createVector(this.center.x, this.center.y);
  } 
}

function movePoint() {
  stroke(lineColor);
  strokeWeight(lineWeight);
  push();
  
  l1 = createVector(0, 0);
  l2 = createVector(width/2, 0)
  translate(width/2, height/2)
  rotate(angle);
  line(l1.x, l1.y, l2.x, l2.y);
  stroke(lineColor);
  strokeWeight(lineWeight);

  pop();
}
//figure out what quadrant point is in, 1 is top left go clockwise
function drawStart(base, vec) {
  stroke(lineColor);
  strokeWeight(lineWeight);
  push();
  stroke(0, 255, 0);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  stroke(lineColor);
  strokeWeight(lineWeight);
  rotate(vec.heading());
  pop();

}
function drawInc(base, vec) {
  stroke(lineColor);
  strokeWeight(lineWeight);
  push();
  stroke(lineColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  
  rotate(vec.heading());
  pop();
  currentPoint = createVector(width/2 + vec.x, height/2  + vec.y)
  
}
function drawOuterCircle(array, point) {
  stroke(127);
  strokeWeight(1);
  ellipse(width/2, height/2, array[point].distCenter * 2, array[point].distCenter * 2);

}
function lineToPoint(array, p, quadrant) {
  findAngle(array, p);
  angleStart = convertAngle(angle, quadrant);
  
  point(array[p].pos.x, array[p].pos.y);
  averagePDistance(array, p);
}
function findFarthestPoint(array) {
  smallToLarge(array);
  let largest = array.length - 1;
  count = largest;
  currentPoint = array[largest];
  circleRadius = array[largest].distCenter;
}

function convertAngle(angle, array, point) {
  if (array[point].quadrant === 1) {
    angle = angle;
  } else if (array[point].quadrant === 2) {
    angle = angle;
  } else if (array[point].quadrant === 3) {
    angle = PI + angle;
  } else {
    angle = PI + angle ;
  }
  //return ang;
}
//find the starting angle of a point
function findAngle(array, p) {
  let c = createVector(width/2, height/2); 
  let opp = array[p].pos;
  let opp2;
  if (array[p].quadrant == 1) {
    opp2 = createVector(array[p].pos.x, height/2)
  } else if (array[p].quadrant == 2) {
    opp2 = createVector(width/2, array[p].pos.y)
  } else if (array[p].quadrant == 3) {
    opp2 = createVector(array[p].pos.x, height/2)
  } else {
    opp2 = createVector(width/2, array[p].pos.y)
  }

  strokeWeight(10);
  stroke(255, 100, 0)
  point(opp.x, opp.y);
  stroke(0, 100, 220);
  point(opp2.x, opp2.y);

  let adj = opp2.dist(c);
  let hyp = c.dist(opp); //hypotenuse

  let adjHyp = adj / hyp;
  let rho = acos(adjHyp); //in radians
  angle = rho + array[p].add; //convert to degrees rho + 
}
function findAngle2(array, p) {
  let c = createVector(width/2, height/2); 
  let opp = array[p].pos;
  let opp2;
  if (array[p].quadrant == 1) {
    opp2 = createVector(array[p].pos.x, height/2)
  } else if (array[p].quadrant == 2) {
    opp2 = createVector(width/2, array[p].pos.y)
  } else if (array[p].quadrant == 3) {
    opp2 = createVector(array[p].pos.x, height/2)
  } else {
    opp2 = createVector(width/2, array[p].pos.y)
  }

  let adj = opp2.dist(c);
  let hyp = c.dist(opp); //hypotenuse
  let adjHyp = adj / hyp;
  let rho = acos(adjHyp); //in radians
  angle2 = rho + array[p].add; //convert to degrees rho + 
  return angle;
}

function findTan(array, point) {
  let opp = averageDistance;
  let adj = array[point].distCenter; 
  increment = atan(opp / adj); //in radians
}
function removeLast (count, array) {
  array.splice(count, 1);
}
//find the nearest point to a point from an array of points
function nearestPoint(p, array) {
  let testArray = [];
  testDistance = averageDistance;
  testPoint(testArray, testDistance, array, p);
  sortFurthest(testArray);

  while (testArray.length == 0 && reductionArray.length != 0) {
    console.log('too far',)
    testDistance *= 1.5;
    testPoint(testArray, testDistance, array, p);
    sortFurthest(testArray);
  }
  count = testArray[0];
  findAngle2(array, testArray[0])  
  console.log(angle, angle2);
  currentPoint = array[count];
  spiralArray.push(array[count]);
  array.splice(count, 1);
  }
  function testPoint(testArray, testDistance, array, p) {
    for (let i = 0; i < array.length; i++) {
      let distance = p.dist(array[i].pos)
      
      if (distance !== 0) {
        if(distance < testDistance) {
        testDistance = distance;
        testArray.push(i);
        }
      }
    }
  }
//sort an array from small to large by distance from center
function sortFurthest(array) {
  array.sort(function(a, b) {
    return b - a; });
  }
function smallToLarge(array) {
  array.sort(function(a, b) {
    return a.distCenter - b.distCenter; });
  }
function smallToNearest(array) {
    array.sort(function(a, b) {
      return a.closest - b.closest; });
    }

//finds the average distance between each point and the nearest six points
function averagePDistance(array, point) {
  let avgs = [];
  let distances = [];
  //for(let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      let tempDist = array[point].pos.dist(array[j].pos);
      //if (i != j) {
        distances.push(tempDist);
      //};
    }
    distances.sort( (a, b) => {return a-b; });
    let firstEight = distances.slice(1,6);
  //}
  let total = firstEight.length;
  let sum = firstEight.reduce((x,y) => x += y);
  avgs.push(sum  / total)
  averageDistance = avgs.toString();
}

