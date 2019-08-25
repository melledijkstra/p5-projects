function Splatter(x, y) {
    this.x = x;
    this.y = y;
    
    this.draw = function() {
        //ellipse(splatX,splatY,30,30);
        beginShape();
        for(var i = 0; i < 100; i++) {
            vertex(this.x,this.y);
            this.x += random(1,5);
            this.y += random(1,5);
        }
        endShape();
    }
}

var splatters = [];

function setup() {
    colorMode(HSB);
    createCanvas(window.innerWidth, window.innerHeight);
    background(50);
    for(var i = 0;i < 5; i++) {
        noStroke();
        fill(random(0,200),100,100);
        splatters.push(new Splatter(width/2,100*i));//random(0,width - 200),random(0,height - 200)));
        splatters[i].draw();
    }
    for(var j = 1; j <= 360;j++) {
        stroke(j, 100, 100);
        line(width/2 - 5, j+20, width / 2 + 5, j+20);
    }
    noLoop();
}