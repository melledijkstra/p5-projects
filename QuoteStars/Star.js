function Star(x, y, quote, author) {
    this.pos = new p5.Vector(x,y);
    this.r = random(4,10);
    this.quote = quote;
    this.author = author;
    this.opacity = random(50,255);
    this.quoteOpacity = 0;

    this.draw = function() {
        // if mouse hovers over star
        if(this.pos.dist(createVector(mouseX,mouseY)) < this.r) {
            fill(255, this.quoteOpacity);
            noStroke();
            textStyle(ITALIC);
            text('"'+this.quote+'"', this.pos.x + 10, this.pos.y + 40, 200);
            textStyle(NORMAL);
            text('- '+this.author, this.pos.x + 10, this.pos.y + 20);
            this.quoteOpacity += 5;
        } else {
            this.quoteOpacity = 0;
        }
        fill(255, this.opacity);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
}