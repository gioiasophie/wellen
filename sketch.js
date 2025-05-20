let audio;
let amp;
let fft;

let p5bezier;

const sketch_height = 400;
const sketch_width = 400;

let waveHeight = 100;
let waveLength = 100;
let segments = width / waveLength;

function preload(){
  // preload assets
}

function setup() {
  let c = createCanvas(sketch_width, sketch_height);
  p5bezier = initBezier(c)

  getAudioContext().suspend();
  userStartAudio();

  audio = new p5.AudioIn();
  audio.start();

  amp = new p5.Amplitude;
  amp.setInput(audio);

  fft = new p5.FFT();
  fft.setInput(audio);

  noFill();
  strokeWeight(3);

}

function draw() {
  background("lightblue");

  for (let i = 0; i < segments; i++) {
    let x1 = i * waveLength;
    let x2 = x1 + waveLength;
    let cp1 = createVector(x1 + waveLength / 3, -waveHeight);
    let cp2 = createVector(x1 + 2 * waveLength / 3, waveHeight);
    bezierVertex(cp1.x, cp1.y, cp2.x, cp2.y, x2, 0);
  }

  const level = amp.getLevel() * 3000;

  p5bezier.draw([
    [0, sketch_height/2],
    [level, level],
    [400, sketch_height/2],
  ])

  let spectrum = fft.analyze(32);
  for (let i = 0; i < spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
   
    p5bezier.draw([
    [0, sketch_height/2],
    [x, h],
    [400, sketch_height/2],
  ], 'OPEN')
  }
}
