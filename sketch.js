let audio;
let amp;
let fft;

let p5bezier

const sketch_height = 400;
const sketch_width = 400;

function preload(){
  // preload assets
}

function setup() {
  let c = createCanvas(sketch_width, sketch_height);
  let p5bezier = initBezier(c)

  noFill();
  strokeWeight(5);

}

function draw() {
  background("white");

  t += 0.015
  p5bezier.draw(getSinPoints(p, t), 'OPEN', 3);
  
}
