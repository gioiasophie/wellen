let audio_;
let amp_;
let fft_;

const sketch_height_ = 400;
const sketch_width_ = 400;

let box_width_ = 130;
let box_height_ = 130;


function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);

  getAudioContext().suspend();
  userStartAudio();

  audio = new p5.AudioIn();
  audio.start();

  amp = new p5.Amplitude;
  amp.setInput(audio);

  fft = new p5.FFT();
  fft.setInput(audio);

}

function draw() {
  background("white");

  fill(5);
  noStroke();

  const small_width_ = box_width_ * 0.5;
  const small_height_ = box_height_ * 0.5;

  // Boxen erstellen
  for(let x = 0; x <= 1; x += 0.5) {
    for(let y = 0; y <= 1; y+= 0.5){
      fill("lightblue");
      rect((sketch_width_ - box_width_) * y, (sketch_height_ - box_height_) * x, box_width_, box_height_);

      // Kreise in den Boxen erstellen
      //Äußerer Kreis für die Lautstärke
      fill("lightyellow");
      const level = amp.getLevel() * 3000;
      circle(small_width_ + (sketch_width_ - box_width_) * y, small_height_ + (sketch_height_ - box_height_) * x, level, level);

      //Lila Kreise
      let spectrum = fft.analyze();
      fill("purple");
        for (let i = 0; i < spectrum.length; i++){
        let h = -small_height_ + map(spectrum[i], 0, 255, small_height_, 0);
        circle(small_width_ + (sketch_width_ - box_width_) * y, small_height_ + (sketch_height_ - box_height_) * x, h);
      }

    }
  }
}