function Splash(x,y,r) {
    this.pos = createVector(x,y);
    this.r = r;
    this.color = color(random(255),random(255),random(255));
    
    this.show = function() {
        push();
        translate(this.pos.x,this.pos.y);
        var x;
        var y;
        fill(this.color);
        beginShape();
        var xoff = 0;
        for(var a = 0;a <= TWO_PI;a += 0.05) {
            var offset = map(noise(xoff,yoff), 0, 1, 0,50);
            var r = this.r + offset;
            x = r * cos(a);
            y = r * sin(a);
            curveVertex(x,y);
            xoff += 0.1;
        }
        endShape();
        pop();
        yoff += 0.01;
    }
    
}

var yoff = 0;

function setup() {
    createCanvas(window.innerWidth,window.innerHeight - 200);
    textSize(14);
    background(0);
    
    splash = new Splash(width/2,height/2,100);
}

function draw() {
    background(0);
    splash.show();
}