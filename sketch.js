var backImage,backGround;
var player, playerRunning;
var ground,groundImage;

var bananaGroup, bananaImage;
var obstaclesGroup, obstacleImage;   

var gameOver;
var score=0;


function preload(){
  backImage=loadImage("jungle2.jpg");
  playerRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backGround=createSprite(0,0,800,400);
  backGround.addImage(backImage);
  backGround.scale=2;
  backGround.x=400;
  backGround.velocityX=-3.5;
  
  player = createSprite(120,340,20,50);
  player.addAnimation("playerRunning",playerRunning);
  player.scale = 0.2;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x =400;
  ground.visible=false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(220);
  
    
  if(ground.x<0) {
    ground.x=400 ;
  }
  if(backGround.x<100){
    backGround.x=400;
  }
  
    if(bananaGroup.isTouching(player)){
      bananaGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.22;
                break;
        case 20: player.scale=0.24;
                break;
        case 30: player.scale=0.26;
                break;
        case 40: player.scale=0.28;
                break;
        default: break;
    }
  
    if(keyDown("space")) {
      player.velocityY = -10;
    }
    player.velocityY = player.velocityY + 0.9;
  
    player.collide(ground);
  
   spawnbanana();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;
     // score=score-2;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnbanana() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var stone = createSprite(800,350,10,40);
    stone .velocityX = -6;
    stone.addImage(obstacleImage);
    
    //assign scale and lifetime to the obstacle     
    stone.scale = 0.2;
    stone.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(stone);
  }
}


  
