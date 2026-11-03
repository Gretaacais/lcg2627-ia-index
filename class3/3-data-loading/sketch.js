// dimensioni del foglio da disegno
let xMax = 400;
let yMax = 600;

// posizione iniziale del razzo
let xRocket = 150;
let yRocket = 300;

let table;     // tabella con i dati delle stelle (stars.csv)
let starImg;   // immagine della stella
let rocketImg; // immagine del razzo

// disegna l'immagine della stella in (dx, dy), quadrata di lato size
function drawStarFromFile(dx, dy, size){
    image(starImg, dx, dy, size, size);
}

// disegna l'immagine del razzo nella sua posizione, 50x50
function drawRocketFromFile(){
    image(rocketImg, xRocket, yRocket, 50, 50);
}

// una stella per ogni riga della tabella
function drawStarsFromTable(){

    for (let i=0; i < table.getRowCount(); i++){
        let starX = (i*37) % width + (i%3) * 5;
        let starY = ((i*73) % height) + (i%7);

        // la dimensione viene letta dalla colonna "starSize"
        let size = table.getNum(i, "starSize");
        drawStarFromFile(starX, starY, size);
    }
}

// muovere il razzo: a destra e verso l'alto
function moveRocket(){
  xRocket = (xRocket +1) % xMax;
  yRocket = yRocket -1;

  // oltre la soglia, il razzo riparte dal basso
  let soglia = - (yMax * 0.6);
  if (yRocket < soglia){
    yRocket = yMax;
  }
}

// preload carica i file prima di setup // p5js version 1
/*
function preload(){
    // csv con la prima riga come intestazione (header)
    table = loadTable("stars.csv", "csv", "header");
    starImg = loadImage("star.png");
    rocketImg = loadImage("rocket.png");
}
    */

async function setup(){ // in p5js version 2 preload non esiste più, quindi si usa setup asincrono
    createCanvas(xMax, yMax); // crea la finestra 400x600

    /* Loading data p5js version 2 */
    table = await loadTable("stars.csv", ",", "header");
    starImg = await loadImage("star.png");
    rocketImg = await loadImage("rocket.png");

    frameRate(30);            // 30 fotogrammi al secondo
    angleMode(DEGREES);       // gli angoli sono espressi in gradi
}

function draw(){

    background("#C0E1FC"); // azzurro chiaro

    // testo nero con le coordinate del mouse
    fill(0);
    textSize(20);
    text("Mouse X " + mouseX +" \
        Mouse Y " + mouseY, 20, 20);
    push(); // aprire contesto di disegno
    noStroke();

    drawStarsFromTable()  // stelle dal csv

    drawRocketFromFile()  // razzo dall'immagine

    moveRocket()          // aggiornare la posizione
}