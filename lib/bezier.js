let controlPoints = [];
let selectedPoint = null;
let curvePoints = [];

function deCasteljau(points, t) {
  if (points.length === 1) {
    return points[0];
  } else {
    let newPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
      let x = lerp(points[i].x, points[i + 1].x, t);
      let y = lerp(points[i].y, points[i + 1].y, t);
      newPoints.push(createVector(x, y));
    }
    return deCasteljau(newPoints, t);
  }
}


function addPoint() {
  // Add control points when the mouse is clicked
  let newPoint = createVector(mouseX, mouseY);
  controlPoints.push(newPoint);
}

function isControlPoint(mX, mY, size) {
  for (let p of controlPoints) {
    if (dist(p.x, p.y, mX, mY) < size) {
      return p;
    }
  }
  return null;
}

function onDragged() {
    if (selectedPoint) {
        selectedPoint.x = mouseX;
        selectedPoint.y = mouseY;
    }
}

function onMouseReleased() {
    selectedPoint = null;
}
