let clickControl = false;
const pointSize = 15;
const lineSize = 5;

function setup() {
  createCanvas(windowWidth - 100, windowHeight);
  noFill();
  stroke(255);
  strokeWeight(lineSize);
  createGUI();
}

function draw() {
  background(0);

  // Draw control points
  for (let p of controlPoints) {
    strokeWeight(pointSize);
    point(p.x, p.y, 10, 10);
    strokeWeight(lineSize);
  }

  // Calculate Bezier curve points
  curvePoints = [];
  
  if (controlPoints.length >= 1 ) {
    for (let t = 0; t <= 1.0001; t += 0.01) {
      let p = deCasteljau(controlPoints, t);
      curvePoints.push(createVector(p.x, p.y));
    }

    // Draw the Bezier curve
    beginShape();
    for (let p of curvePoints) {
      vertex(p.x, p.y);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 100, windowHeight);
}

function mousePressed() {

  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    if (state & 0b1) {
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
  onMouseReleased();
}
