const buttons = {};
let state = 0b0;

function createGUI() {
  buttons['normal'] = createButton('Normal Mode');
  buttons['normal'].position(windowWidth - 100, 0);
  buttons['normal'].mousePressed(() => {
    state ^= 0b1;
    state == 0b0 ? buttons['normal'].html('Normal Mode') : buttons['normal'].html('Insert Mode');
    console.log(buttons['normal']);
  });
  //button = createButton('Reset')
  //button.position(10, 10)
  //button.mousePressed(reset)
}