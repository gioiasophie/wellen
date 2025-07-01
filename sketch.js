let audio;
let amp;
let fft;

let p5bezier;

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
  let c = createCanvas(windowWidth, windowHeight);
  background(20, 24, 50);
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

  // Farbverlauf 1
  colorStart1 = color(173, 216, 230);   // LightBlue
  colorEnd1 = color(221, 160, 221);   // Plum

  // Farbverlauf 2
  colorStart2 = color(152, 251, 152);   // PaleGreen
  colorEnd2 = color(64, 224, 208);    // Turquoise

  // Farbverlauf 3
  colorStart3 = color(255, 160, 122);   // LightSalmon
  colorEnd3 = color(255, 218, 185);   // PeachPuff

  // Farbverlauf 4
  colorStart4 = color(255, 127, 80);    // Coral
  colorEnd4 = color(255, 105, 180);    // HotPink

  // Farbverlauf 5
  colorStart5 = color(173, 255, 47);    // GreenYellow
  colorEnd5   = color(135, 206, 250);   // LightSkyBlue

}

function draw() {
  background(20, 24, 50, 15); // oder (0) für hartes Schwarz

  const level = amp.getLevel() * 1500;
  let spectrum = fft.analyze(8192);
  let bass = fft.getEnergy("bass");
  let mid = fft.getEnergy("mid");
  let treble = fft.getEnergy("treble");

  let points_level = [];
  let points_spectrum = [];
  let points_bass = [];
  let points_mid = [];
  let points_treble = [];
  
    for (let x = 0; x < windowWidth; x += 10) {
      let y = windowHeight/2 + tan(x * 0.05) * level;
      points_level.push([x, y]);
    }
    
    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length - 1, 0, windowWidth);
      let y = windowHeight / 2 + (spectrum[i]) * 0.5;
      points_spectrum.push([x, y]);
    }

    for (let x = 0; x < windowWidth; x += 10) {
      let y = windowHeight/2 + cos(x * 0.04) * bass;
      points_bass.push([x, y]);
    }

    for (let x = 0; x < windowWidth; x += 10) {
      let y = windowHeight/2 + tan(x * 0.04) * mid;
      points_mid.push([x, y]);
    }

    for (let x = 0; x < windowWidth; x += 10) {
      let y = windowHeight/2 + sin(x * 0.04) * treble;
      points_treble.push([x, y]);
    }

    // === Linie 1: Spectrum 
    let c1 = lerpColor(colorStart1, colorEnd1, t1);
    stroke(c1);
    strokeWeight(1.5);
    noFill();
    p5bezier.draw(points_spectrum, 'OPEN', 5);

    // === Linie 2: Level 
    let c2 = lerpColor(colorStart2, colorEnd2, t2);
    stroke(c2);
    strokeWeight(1.5);
    p5bezier.draw(points_level, 'OPEN', 5);

    let c3 = lerpColor(colorStart3, colorEnd3, t3);
    stroke(c3);
    strokeWeight(1.5);
    p5bezier.draw(points_bass, 'OPEN', 5);

    let c4 = lerpColor(colorStart4, colorEnd4, t2);
    stroke(c4);
    strokeWeight(1.5);
    p5bezier.draw(points_mid, 'OPEN', 5);

    let c5 = lerpColor(colorStart5, colorEnd5, t1);
    stroke(c5);
    strokeWeight(1.5);
    p5bezier.draw(points_treble, 'OPEN', 5);

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

function keyPressed(){
  save('wellen.png');
} 