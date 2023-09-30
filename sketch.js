let clickControl = false;
const pointSize = 15;
const lineSize = 2;
const dotLineSize = 5;

function setup() {
  createCanvas(windowWidth - 100, windowHeight);
  noFill();
  stroke(255);
  strokeWeight(lineSize);
  createGUI();
}

function draw() {
  background(0);

  //Draw poligonals
  

  // Calculate and draw Bezier curve points
  if (curves.length >= 1) {
    stroke(0, 255, 0);
    for (let curve of curves) {
      if (curve.length >= 1 ) {
        beginShape();
        for (let t = 0; t <= 1.0001; t += 1/config['curveEvals']) {
          let p = deCasteljau(curve, t);
          if (state & 0b010) vertex(p.x, p.y);
          //curvePoints.push(createVector(p.x, p.y));
        }
        endShape();
      }
    }
    stroke(255);
  }
  // Draw control points
  for(let curve of curves) {
    for (let i=0; i<curve.length; ++i) {
      p = curve[i];
      if (i != curve.length - 1 && state & 0b100) {
        nextP = curve[i+1];
        strokeWeight(dotLineSize);
        for (let t=0; t<=1; t += 0.08) {
          const a = lerp(p.x, nextP.x, t);
          const b = lerp(p.y, nextP.y, t);
          point(a, b);
        }
        strokeWeight(lineSize);
      }
      if (curve == curves[currentCurve]) stroke(255, 0 ,0);
      if (p == selectedPoint) stroke(255, 255, 0);
      strokeWeight(pointSize);
      if (state & 0b001) point(p.x, p.y, 10);
      strokeWeight(lineSize);
      stroke(255);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 100, windowHeight);
}

function mousePressed() {

  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    if (shift) {
      addPoint();
    } else {
      selectedPoint = isControlPoint(mouseX, mouseY, pointSize); 
    }
  }
}


function mouseDragged() {
  onDragged();
}


function mouseReleased() {
  //onMouseReleased();
}


function keyPressed() {
  handleKeyPressed();
}


function keyReleased() {
  handleKeyReleased();
}
