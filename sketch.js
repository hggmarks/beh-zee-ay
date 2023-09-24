
function setup() {
  createCanvas(1920, 1080);
  noFill();
  stroke(255);
  strokeWeight(5);

}

function draw() {
  background(0);

  // Draw control points
  for (let p of controlPoints) {
    ellipse(p.x, p.y, 10, 10);
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

