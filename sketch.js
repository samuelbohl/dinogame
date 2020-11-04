//Autor: Samuel Bohl

let totalPopulation = 100;

let activeDinos = [];
let allDinos = [];


var cacti = [];
var rand = 100;
var count = 0;
var counter = 0;
var generations = 0;
var highscore = 0;

let dinoone;
let dinotwo;
let dinothree;
let cactusone;
let score;
let over;
let gen;
let alive;
let fc;


function setup(){
  createCanvas(800, 400);
  score = select("#score");
  gen = select("#gen");
  alive = select("#alive");
  fc = select("#fc");
  hs = select("#hs");
  dinoone = loadImage('dino1.png');
  dinotwo = loadImage('dino2.png');
  dinothree = loadImage('dino3.png');
  cactusone = loadImage('cactus.png');
  over = loadImage("over.png");

  //instanciate dino and spawning first cactus

  cacti.push(new Cactus());

  // Create a population
  for (let i = 0; i < totalPopulation; i++) {
    let dino = new Dino();
    activeDinos[i] = dino;
    allDinos[i] = dino;
  }

}

function draw(){
  background(255);
  drawLine();

  //Cactus Spawning: Select between random and linar
  //linearNewCacti();
  randomNewCacti();

  //updating cacti
  for (var i = cacti.length-1 ; i >= 0 ; i--) {
    cacti[i].update();
    if(cacti[i].offscreen()){
      cacti.splice(i, 1);
    }
  }

  if(activeDinos.length == 0){
    //console.log("next");
    nextGeneration();
    generations++;
  }

  // draw dinos and cacti

  for (var i = 0; i < activeDinos.length; i++) {
    activeDinos[i].show();
  }

  for (var i = 0; i < cacti.length; i++) {
    cacti[i].show();
  }

  // updating dinos && checking if hit (then removed)
  for (var i = activeDinos.length-1; i >= 0 ; i--) {
    let dino = activeDinos[i];
    //console.log("Dino is about to get updated");
    dino.think();
    dino.update();


    for (var j = 0; j < cacti.length; j++) {
      //if hit a cactus
      if(cacti[j].hits(dino)){
        console.log("Hit");
        //Remove the dino
        activeDinos.splice(i, 1);
        break;
        //console.log("HIT!");
        //gameOver();
      }
    }
  } // end for loop Dino Update and hit


//HTML
score.html(counter);
gen.html(generations);
alive.html(activeDinos.length);
fc.html(frameCount);
hs.html(highscore);
counter++;
if (highscore < counter){
  highscore = counter;
}

}// end draw

//jumps when space is pressed and 500ms passed since last jump
// function keyPressed() {
//   if (key == " ") {
//     end = new Date().getTime();
//     if((end - start) > 500){
//       start = new Date().getTime();
//       console.log("JUMP!");
//       console.log(dino.velocity);
//       dino.up();
//     }
//   }
// }

//Draws the game line
function drawLine(){
  fill(0);
  line(0, height/2, width, height/2);
}

function randomNewCacti(){
  if(count >= rand){
    rand = random(50, 160);
    cacti.push(new Cactus());
    count = 0;
  }
  count++;
}

function linearNewCacti(){
  if(frameCount %100 == 0){
    cacti.push(new Cactus());
  }
}

function gameOver(){
  fill(255);
  rect(0,0,width,height);
  image(over, width/2-over.width/6, height/2-over.height/6, over.width/3, over.height/3);
  noLoop();
}
