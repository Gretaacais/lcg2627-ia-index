// dimensioni del foglio da disegno
let xMax = 400;
let yMax = 600;

// posizione iniziale del razzo
let xRocket = xMax/2;
let yRocket = yMax*0.6;

// DIMENSIONI DEL RAZZO CI SERVONO PER VERIFICARE SE IL MOUSE È SOPRA IL RAZZO
let rocketHeight = 180;
let rocketWidth = 80;

// variabili interazione
let buttonText;
let buttonRolling;
let greeting;
let inpuText;
let bckgcolor = "#C0E1FC"
let sliderColor;
let rocketBodyColor = 220;

let colors = [ "red", "green", "pink", "blue", 
  "orange", "yellow" , "#C0E1FC", 220];

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
  fill(rocketBodyColor);
  stroke(40);
  rectMode(CENTER);
  rect(0, 30, rocketWidth, rocketHeight, 20);

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
  
  // creo label per il testo
  greeting = createElement('h2', 'What do you want to display?');
  greeting.style('color', 'deeppink'); // assegna stile CSS
  greeting.position(20, yMax - 50);

  // creo slider per il colore del razzo
  // min, max, default, step
  sliderColor = createSlider(0, 7, 7, 1);
  sliderColor.position(20, yMax);
  sliderColor.size(100);

  // creo input per inserire il testo da mostrare
  inpuText = createInput();
  inpuText.position(20, yMax -  65);

  // creo bottone per inviare il testo da mostrare
  buttonText = createButton('submit');
  buttonText.position(inpuText.x + inpuText.width,yMax - 65);
  buttonText.mousePressed(newTextFunc);

  //bottone del colore
  buttonRolling = createButton("roll the color!");
  buttonRolling.position(20, yMax - 100);
  buttonRolling.mousePressed(rollColor);
  buttonRolling.style('background-color', '#ffffff');

  // Hover effect using mouse events
  buttonRolling.mouseOver(() => {
    buttonRolling.style('background-color', '#cccccc'); // hover color
  });
  buttonRolling.mouseOut(() => {
    buttonRolling.style('background-color', '#ffffff'); // normal color
  });
  buttonRolling.style('transition', 'background-color 0.1s');
}

function draw() {
  background(bckgcolor); // azzurro chiaro

  // il colore del razzo dipende dallo slider
  rocketBodyColor = colors[ceil(sliderColor.value())];

  // testo con le coordinate del mouse
  fill(0); // nero
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20)

  drawStars(120) // stelle

  // razzo scalato a 0.75 e ruotato di 45 gradi
  drawRocket(xRocket, yRocket, 0.75, 45);

  moveRocket(); // aggiornare la posizione

  // verifica se il mouse è sopra il razzo
  let isover=false;
  if(isMouseOverRocket() ){
      isover=true
  } else{
    isover=false;
  }
  text("Is over the rocket? "+ isover, 20, 100);
}

//determina se il mouse è sopra al razzo
function isMouseOverRocket() { 
  return (mouseX > xRocket-(rocketWidth/2) &&
          mouseX < xRocket + (rocketWidth/2) &&
          mouseY > yRocket-(rocketHeight/2) &&
          mouseY < yRocket + yRocket+(rocketHeight/2));

}

function rollColor(){
  let  idx = random(0,7);
  //vogliamo solo numeri interi
  //intero inferiore, 1.1 --> 1
  // bckgcolor = floor(idx);
  //intero superiore, 1.1 --> 2
  //un numero intero 
  //tra 1 e 7
  //indice per accedere all'array
  bckgcolor = colors[ceil(idx)];
  //redraw();
}


function newTextFunc(){
  let text = inpuText.value();
  greeting.html("The text now is " + text);
}