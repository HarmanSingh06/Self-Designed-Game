var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var astronauts, astronaut1, astronaut2, astronaut3, astronaut4;
var astrounat1_Anim_REV,astrounat1_Anim_LEFT;
var track, car1_img, car2_img, car3_img, car4_img;

function preload(){
  track = loadImage("../Assets/Images/Map.png");
  astrounat1_Anim = loadAnimation("../Assets/Images/Running.png","../Assets/Images/Running 2.png","../Assets/Images/Running 3.png");
  astrounat1_Anim_REV = loadAnimation("../Assets/Images/RunningREV.png","../Assets/Images/Running 2REV.png","../Assets/Images/Running 3REV.png");

  car2_img = loadAnimation("../images/car2.png");
  car3_img = loadAnimation("../images/car3.png");
  car4_img = loadAnimation("../images/car4.png");
  ground = loadAnimation("../images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){

  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
