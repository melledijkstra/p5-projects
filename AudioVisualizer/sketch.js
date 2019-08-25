var s;
var fft;

function preload() {
    s = loadSound('2CELLOS-Hysteria.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    fft = new p5.FFT();
    s.amp(0.2);
}

function mouseClicked() {
    if(s.isPlaying()) {
        s.pause();
    } else {
        s.play();
    }
}

function draw() {
    background(0);
    var spectrum = fft.analyze();
    noStroke();
    fill(0, 255, 0);
    for (var i = 0; i < spectrum.length; i++) {
        var w = map(i, 0, spectrum.length, 0, width);
        var h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(w, height, width / spectrum.length, h)
    }

    var waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(255, 0, 0);
    strokeWeight(1);
    for (var i = 0; i < waveform.length; i++) {
        var x = map(i, 0, waveform.length, 0, width);
        var y = map(waveform[i], -1, 1, 0, height);
        vertex(x, y);
    }
    endShape();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
