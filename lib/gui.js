// 0b{poligonais}{curvas}{pontos}
let state = 0b111;

let config = {
  addNewCurve: () => {
    curves.push([]);
    currentCurve += 1;
  },
  removePoint: () => deletePoint(),
  removeCurve: () => deleteCurve(),
  nextCurve: () => currentCurve = (currentCurve + 1) % (curves.length),
  prevCurve: () => {
    if(currentCurve - 1 < 0)
      currentCurve = curves.length - 1;
    else
      --currentCurve;
  },
  curveEvals: 5,
  points: true,
  curves: true,
  poligs: true,
};


function createGUI() {

  gui = new dat.GUI();
  gui.add(config, 'addNewCurve').name('new curve');
  gui.add(config, 'removePoint').name('delete point');
  gui.add(config, 'removeCurve').name('delete curve')
  gui.add(config, 'nextCurve').name('next curve');
  gui.add(config, 'prevCurve').name('prev curve');
  gui.add(config, 'points').onChange(() => {state ^= 0b001});
  gui.add(config, 'curves').onChange(() => {state ^= 0b010});
  gui.add(config, 'poligs').onChange(() => {state ^= 0b100});
  gui.add(config, 'curveEvals');

}
