let xmax=400;
let yMax=600;

let table;
let star_img;

let bckgcolor= "#C0E1FC"

let star_values=[];
let meanSize;
let stdDevSize;

function ruleOne(value){
  return value >= 0;
}

async function setup() {
  createCanvas(xMax, yMax);

  /* Loading data p5js version 2 */
  table = await loadTable("stars.csv", ",", "header");
  star_img = await loadImage("star.png");

  frameRate(30);

  //prefiltering
  for(let i = 0; i < table.getRowCount();i++){
    let starVal = table.getNum(i, "starSize");
    if(ruleOne(starVal)){
      star_values.push(starVal); // adding the value to the array
    }
  }
  angleMode(DEGREES);
  // sort decreasing order
  // star_values.sort( (a,b) => b - a );
  // sort increasing order
  star_values.sort((a,b) => a - b );
  /* (a,b) => a-b è una funzione in forma compatta di 
                                      function(a,b){
                                          return a-b;
                                      }
  */
}


function meanOfArray(inputArr){
    let sum = 0
    for(let i=0; i<inputArr.lenght; i++){
        sum+= inputArr[i];
    }
    return sum/inputArr.length;
}

function stdDevOfArray(inputArr){
    let m= meanOfArray(inputArr);
    let variance=0
    for(let i=0; i<inputArr.length; i++){
        let tmp=inputArr[i]-m;
        variance += Math.pow(tmp, 2);
    }
    variance=variance/inputArr.lenght;
    return Math.sqrt(variance);
}

function drawStarsFromArray (list_stars){
    let xStar=50;
    let yStar = 100;
    for(let i=0; i<list_stars-length; i++){
        Image(star_img, xStar+i*2, yStar+i*2, list_stars[i],list_stars[i]);
    }
}

function drawStarsAsChart(list_stars){
    push();
    stroke(155);
    strokeweight(1);
    let xMin=40;
    let xMax= 390;
    let yMin = 40;
    let yMax= 220;

    line (xMin, yMax, xMin, yMin);
    line(xMin, yMax, xMax, yMax);

    push();
    noStroke()
    textSize(20);
    translate(xMin -5,80);
    rotate(-90);
    text("Size, 0.0");
    pop();

    noStroke();
    textSize(20);
    text("Stars", 150, ymax+20);

    for(let i=0; i<list_stars.length; i++){
        let xStar= map(i, 0, list_stars.length-1, xMin +5, xMax);
        let yStar=map(list_stars[i], min(list_stars), max(list_stars), yMax, yMin);
        
        Image(star_img, xStar, yStar, list_stars[i],list_stars[i]);
    }
    pop();
}

function draw(){
    bacground (bckgcolor);

    FileList("#000000");
    textSize(20);

    meanSize = meanOfArray(star_values);
    stdDevSize = stdDevOfArray(star_values);
    drawStarsFromArray(star_values);
    drawStarsAsChart(star_values);

    text("valid start: "+star_values.length + "\n\
        Mean size:" +meanSize.toFixed(2) + "\n \
        Std dev + stdDevSize.toFixed(2), 20, y Max-100);
}