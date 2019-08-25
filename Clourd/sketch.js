let maxDepth = 4;
let cols = 4;
let rows = 5;

let colors = [];
/** @type Box */
let bb;

class Box {

    constructor(pos, size, color) {
        this.pos = pos;
        this.size = size;
        this.c = color;
        this.boxes = [];
        // the current generation of this box
        this.generation = 1;
        // if this box has any more generations
        this.hasNextGeneration = false;
        this.showBorder = true;
    }

    draw() {
        // first draw all children as the border of the parent should be drawn over
        // the border of the child
        this.boxes.forEach((box) => {
            box.draw();
        });
        if(this.showBorder) {
            strokeWeight(Math.pow(this.generation, 2));
            stroke(0);
        } else {
            noStroke();
        }
        // if there is not another generation in this box
        // show the actual box
        if(!this.hasNextGeneration) {
            fill(this.c);
        } else {
            noFill();
        }
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

    /**
     * Generates boxes in boxes, woah!
     * @param generations The amount of generations to create
     */
    generateBoxes(generations) {
        this.generation = generations;
        console.log('generation: ', generations);
        if (generations > 0) {
            let x = this.pos.x;
            let y = this.pos.y;
            let cw = (this.size.x / cols);
            let ch = (this.size.y / rows);
            for (let c = 0; c < cols; c++) {
                while (y < this.pos.y + this.size.y) {
                    let h = ch * random(0.2, 1);
                    let clr = colors[Math.round(random(0,1))];
                    h = (y + h > this.pos.y + this.size.y) ? this.pos.y + this.size.y - y : h;
                    let b = new Box(createVector(x, y), createVector(cw, h), clr);
                    console.log(b.size.y);
                    if(b.size.y > 10) {
                        this.hasNextGeneration = true;
                        b.generateBoxes(generations - 1);
                    }
                    this.boxes.push(b);
                    y += b.size.y;
                }
                // shift x to the next column
                x += cw;
                // start y again at top of box
                y = this.pos.y;
            }
        }
    }

    /**
     * Check if point intersects with this box
     * @param p {p5.Vector}
     * @return boolean
     */
    collides(p) {
        return p.x >= this.pos.x &&
            p.y >= this.pos.y &&
            p.x <= this.pos.x + this.size.x &&
            p.y <= this.pos.y + this.size.y;
    }

}

// function mouseMoved() {
//     boxes.forEach((box) => {
//         box.active = box.collides(createVector(mouseX, mouseY));
//     });
// }

// function mouseClicked() {
//     boxes.forEach((box) => {
//         if(box.collides(createVector(mouseX, mouseY))) {
//             console.log(box.generation, box.pos.x, box.pos.y, box.size.x, box.size.y);
//         }
//     });
// }

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    colors.push(color('#007CCA'), color('#FF4400'));

    // create box as big as the screen
    bb = new Box(createVector(0,0), createVector(width, height), color('rgba(0,0,0,1)'));
    bb.showBorder = false;
    // generate smaller boxes inside this box
    bb.generateBoxes(maxDepth);
    console.log(bb);

    // let x = 0,
    //     y = 0,
    //     renderH;
    // let cw = (width / cols); // column width
    // let ch = (height / rows); // column height
    // for (let c = 0; c < cols; c++) {
    //     x = c * cw;
    //     renderH = 0;
    //     let w = cw;
    //     while (renderH < height) {
    //         y = renderH;
    //         let h = ch * random(0.8, 1);
    //         h = (y + h > height) ? height - renderH : h;
    //         let b = new Box(createVector(x, y), createVector(w, h), colors[Math.round(random(0, 1))]);
    //         b.generateBoxes(maxDepth);
    //         boxes.push(b);
    //         renderH += b.size.y;
    //     }
    // }
}

let x = 0;

function draw() {
    background(0);

    bb.draw();

    fill('white');
    ellipse(x, 2.5, 5, 5);
    x += 3;

    noLoop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
