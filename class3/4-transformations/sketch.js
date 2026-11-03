// dimensioni del foglio da disegno
let xMax = 400;
let yMax = 600;

// posizione iniziale del razzo
let xRocket = xMax/2;
let yRocket = yMax*0.6;

// disegna una singola stella; il colore dipende da i
// i: indice, starX/starY: posizione, transparency: alpha, size: diametro
function drawStar(i, starX, starY, transparency, size){
  if(i%2==0){
      //stella tipo 1
      fill(255, 255, 150, transparency);
      ellipse(starX, starY, size);
    } else if (i%3==0){
      //stella tipo 2
      fill(255, 100, 255, transparency);
      ellipse(starX, starY, size);
    } else {
      //stella tipo 3
      fill(100, 255, 255, transparency);
      ellipse(starX, starY, size);
    }

}

// disegna n stelle (default 120)
function drawStars(n=120){
  push(); // aprire contesto di disegno
  noStroke(); // eliminare i bordi 

  for (let i=0; i < n; i++){
    let starX = (i*37) % width + (i%3)*5;
    let starY = ((i*73) % height) + (1%7);

    // trasparenza casuale tra 150 e 255
    let randomTransparency = random(150, 255);
    // diametro casuale tra 2.8 e 5.8 pixel
    let randomSize = random(2.8, 5.8);

    drawStar(i, starX, starY, randomTransparency, randomSize)
  }
  pop(); // chiudere contesto
}

// disegna il razzo nella posizione (xRocket, yRocket)
function drawRocket(){
  push();

  // corpo
  fill(220);
  stroke(40);
  rectMode(CENTER);
  rect(xRocket, yRocket+30, 80, 180, 20);

  // punta (triangolo rosso)
  fill(200, 40, 40);
  triangle(xRocket-40, yRocket-60, xRocket+40,yRocket-60, xRocket, yRocket-120)

  // finestrino
  fill(40, 150, 220);
  stroke(255);
  strokeWeight(3);
  ellipse(xRocket, yRocket+30,48,48);

  pop();
}

// aggiorna la posizione del razzo a ogni fotogramma
function moveRocket(){
  xRocket = (xRocket +1) % xMax;
  yRocket = yRocket -1;

  // oltre la soglia, il razzo riparte dal basso
  let soglia = - (yMax * 0.6);
  if (yRocket < soglia){
    yRocket = yMax;
  }
}

function setup() {
  createCanvas(xMax, yMax); // crea la finestra 400x600
  frameRate(30);            // 30 fotogrammi al secondo
  angleMode(DEGREES);       // gli angoli sono espressi in gradi
}

function draw() {
  background("#C0E1FC"); // azzurro chiaro

  // testo con le coordinate del mouse
  fill(0); // nero
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20)

  drawStars(120)  // sfondo di stelle

  drawRocket();   // razzo

  moveRocket();   // aggiornare la posizione
}

function mousePressed(){
  if(isLooping()){
    noLoop();
  } else{
    loop()
  }
}

function keyPressed(){
  redraw();
  }