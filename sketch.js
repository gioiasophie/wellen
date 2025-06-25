let audio;
let amp;
let fft;

let p5bezier;

const sketch_height = 400;
const sketch_width = 400;

let colorStart1, colorEnd1;
let colorStart2, colorEnd2;
let colorStart3, colorEnd3;
let t1 = 0; // Interpolationswert
let t2 = 0;
let t3 = 0;
let tSpeed1 = 0.005;
let tSpeed2 = 0.004; // anderer Wert für unabhängige Bewegung
let tSpeed3 = 0.003;


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

  // Farbverlauf 1: Indigo → Magenta
  colorStart1 = color(75, 0, 130);     // Indigo
  colorEnd1 = color(255, 0, 150);      // Magenta

  // Farbverlauf 2: Koralle → Goldgelb
  colorStart2 = color(255, 127, 80);   // Koralle
  colorEnd2 = color(255, 215, 0);      // Goldgelb

  // Farbverlauf 3: Türkis → Limettengrün
  colorStart3 = color(64, 224, 208);   // Türkis
  colorEnd3 = color(173, 255, 47);     // Limettengrün

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

    let c3 = lerpColor(colorStart3, colorEnd3, t3);
    stroke(c3);
    strokeWeight(2);
    p5bezier.draw(points_bass, 'OPEN', 5);

    // t aktualisieren (hin und her interpolieren)
    t1 += tSpeed1;
    t2 += tSpeed2;
    t3 += tSpeed3;

    if (t1 > 1 || t1 < 0) {
      tSpeed1 *= -1;
    }
    if (t2 > 1 || t2 < 0) {
      tSpeed2 *= -1;
    }
    if (t3 > 1 || t3 < 0) {
      tSpeed3 *= -1;
    }
}