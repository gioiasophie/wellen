let audio;
let amp;
let fft;

let p5bezier;

const sketch_height = 400;
const sketch_width = 400;

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

  let waveHeight = sketch_height/2;
  let waveLength = 200;
  let segments = sketch_width/ waveLength;
  
  const level = amp.getLevel() * 3000;

  for (let i = 0; i < sketch_width; i++) {
    p5bezier.draw([
      [segments, waveHeight],
      [segments += i, level],
      [segments += i, level]
      
    ])
  }
}
