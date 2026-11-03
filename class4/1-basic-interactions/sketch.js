// dimensioni del foglio da disegno
let xMax = 400;
let yMax = 600;

// posizione iniziale del razzo
let xRocket = xMax/2;
let yRocket = yMax*0.6;

// disegna una singola stella; il colore dipende da i
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
  pop();
}

// disegna il razzo in (x, y) con scala scl e rotazione angle (gradi)
function drawRocket(x, y, scl=1, angle=0){
  push();
  translate(x, y); // l'origine si sposta nella posizione del razzo
  scale(scl);      // ingrandire/rimpicciolire
  rotate(angle);   // ruotare attorno all'origine

  // da qui in poi le coordinate sono relative al razzo
  // corpo
  fill(220);
  stroke(40);
  rectMode(CENTER);
  rect(0, 30, 80, 180, 20);

  // punta (triangolo rosso)
  fill(200, 40, 40);
  triangle(-40, -60, 40,-60, 0, -120)

  // finestrino
  fill(40, 150, 220);
  stroke(255);
  strokeWeight(3);
  ellipse(0, 30,48,48);

  pop(); // ripristinare il sistema di coordinate
}

// muovere il razzo: a destra e verso l'alto
function moveRocket(){
  /*xRocket = (xRocket +1) % xMax;
  yRocket = yRocket -1;

  // oltre la soglia, il razzo riparte dal basso
  let soglia = - (yMax * 0.6);th
  if (yRocket < soglia){
    yRocket = yMax;
  }*/

  // muovere il razzo: a destra e verso l'alto (retta 45°)
  xRocket = xRocket + 1;
  yRocket = yRocket - 1;

  // se il razzo è uscito in alto a destra,
  // riparte dal basso a sinistra
  if (xRocket > xMax - 40 && yRocket < 0){
    xRocket = 0;
    yRocket = yMax - 40; // calcolare la posizione in basso considerando l'altezza del razzo ruotato
  }
}

function setup() {
  createCanvas(xMax, yMax); // crea la finestra 400x600
  frameRate(30);            // 30 fotogrammi al secondo
  angleMode(DEGREES);       // gli angoli sono espressi in gradi
  //noLoop(); // disabilitare il loop di disegno automatico per testare keyPressed()
}

function draw() {
  background("#C0E1FC"); // azzurro chiaro

  // testo con le coordinate del mouse
  fill(0); // nero
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20)

  drawStars(120) // stelle

  // razzo scalato a 0.75 e ruotato di 45 gradi
  drawRocket(xRocket, yRocket, 0.75, 45);

  moveRocket(); // aggiornare la posizione
}


/* Callbacks per interazioni con l'utente */

function mousePressed() {
  // Start/stop the animation loop
  if (isLooping()) { //https://p5js.org/reference/p5/isLooping/
    noLoop(); //https://p5js.org/reference/p5/noLoop/
  } else {
    loop(); //https://p5js.org/reference/p5/loop/
  }
}

function keyPressed() { //https://p5js.org/reference/p5/keyPressed/
  // Draw one frame
  redraw(); //https://p5js.org/reference/p5/redraw/
}
