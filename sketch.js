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


  strokeWeight(3);

}

function draw() {
  background("lightblue");
  
  const level = amp.getLevel() * 1500;
  let spectrum = fft.analyze(8192);

  let points_level = [];
  let points_spectrum = [];
  let points_spectrum3 = [];
  
    for (let x = 0; x < sketch_width; x += 10) {
      let y = 200 + sin(x * 0.05) * level;
      points_level.push([x, y]);
    }
    
    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length - 1, 0, sketch_width);
      let y = sketch_height / 2 + (spectrum[i]) * 0.5;
      points_spectrum.push([x, y]);
    }

    noFill();
    p5bezier.draw(points_level, 'OPEN', 5);
    noFill();
    p5bezier.draw(points_spectrum, 'OPEN', 5);
 
  
  

  

  
}
