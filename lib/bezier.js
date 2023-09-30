let curves = [[]];
let currentCurve = 0;
let controlPoints = [];
let selectedPoint = null;
let shift = false;

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


function handleKeyPressed() {
  if (keyCode == SHIFT) shift = true;
}


function handleKeyReleased() {
  if (keyCode == SHIFT) shift = false;
} 


function addPoint() {
  // Add control points when the mouse is clicked
  let newPoint = createVector(mouseX, mouseY);
  //if(curves.length == 0) curves.append([])
  curves[currentCurve].push(newPoint);
  //controlPoints.push(newPoint);
}


function deletePoint() {
  if (selectedPoint){
    const idx = curves[currentCurve].indexOf(selectedPoint);
    curves[currentCurve].splice(idx, 1);
    selectedPoint = null;
  }
}

function deleteCurve() {
  curves.splice(currentCurve, 1);
  if (curves.length == 0)
    curves.push([]);
  else if (currentCurve == curves.length)
    --currentCurve;
}


function isControlPoint(mX, mY, size) {
  //for (let p of controlPoints) {
  for (let p of curves[currentCurve]) {
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
