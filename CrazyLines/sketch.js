var nodes = [];

function setup() {
  createCanvas(windowWidth,windowHeight);

  for(var i = 0; i < 15;i++) {
    var v = createVector(random(windowWidth),random(windowHeight));
    nodes.push(v);
  }
}

function draw() {
  background(0);

  fill(random(255),random(255),random(255));
  ellipse(nodes[0].x,nodes[0].y,8,8);

  for(var i = 1;i < nodes.length;i++) {
    var pref = nodes[i-1];

    stroke(random(255),random(255),random(255));
    line(pref.x,pref.y,nodes[i].x,nodes[i].y);
    noStroke();
    ellipse(nodes[i].x,nodes[i].y,8,8);

    pref = nodes[i];
    nodes[i].add(p5.Vector.random2D().mult(random(0,20)));
    checkBounds(nodes[i]);
  }
}

function checkBounds(v) {
  if(v.x < 0) v.x = windowWidth;
  if(v.x > windowWidth) v.x = 0;
  if(v.y < 0) v.y = windowHeight;
  if(v.y > windowHeight) v.y = 0;
}

function widowResized() {
  resizeCanvas(windowWidth,windowHeight);
}
