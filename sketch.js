let audio;
let amp;
let fft;

let p5bezier;

const sketch_height = 400;
const sketch_width = 400;

let colorStart1, colorEnd1;
let colorStart2, colorEnd2;
let t1 = 0; // Interpolationswert
let t2 = 0;
let tSpeed1 = 0.005;
let tSpeed2 = 0.004; // anderer Wert für unabhängige Bewegung


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

  // Farbverlauf 1: Blau → Lila
  colorStart1 = color(0, 100, 255); //Blau
  colorEnd1 = color(200, 0, 200); //Lila

  // Farbverlauf 2: Pink → Gelb
  colorStart2 = color(255, 0, 150);
  colorEnd2 = color(255, 255, 0);

}

function draw() {
  background(0, 5);
  
  const level = amp.getLevel() * 1500;
  let spectrum = fft.analyze(8192);
  let bass = fft.getEnergy("bass");

  let points_level = [];
  let points_spectrum = [];
  let points_bass = [];
  
    for (let x = 0; x < sketch_width; x += 10) {
      let y = 200 + sin(x * 0.05) * level;
      points_level.push([x, y]);
    }
    
    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length - 1, 0, sketch_width);
      let y = sketch_height / 2 + (spectrum[i]) * 0.5;
      points_spectrum.push([x, y]);
    }

    for (let x = 0; x < sketch_width; x += 10) {
      let y = sketch_height/2 + sin(x * 0.04) * bass;
      points_bass.push([x, y]);
    }

    // === Linie 1: Spectrum → Blau → Lila
    let c1 = lerpColor(colorStart1, colorEnd1, t1);
    stroke(c1);
    strokeWeight(2);
    noFill();
    p5bezier.draw(points_spectrum, 'OPEN', 5);

    // === Linie 2: Level → Pink → Gelb
    let c2 = lerpColor(colorStart2, colorEnd2, t2);
    stroke(c2);
    strokeWeight(2);
    p5bezier.draw(points_level, 'OPEN', 5);

    stroke(random(240, 255), random(240, 255), random(150, 200));
    strokeWeight(3);
    p5bezier.draw(points_bass, 'OPEN', 5);

    // t aktualisieren (hin und her interpolieren)
    t1 += tSpeed1;
    t2 += tSpeed2;

    if (t1 > 1 || t1 < 0) {
      tSpeed1 *= -1;
    }
    if (t2 > 1 || t2 < 0) {
      tSpeed2 *= -1;
    }
}