var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var bananasGroup, bananasImage, banana;
var obstaclesGroup, obstacle1;
var banana;
var reset,reset1;
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananasImage = loadImage("banana.png");
  reset1=loadImage("gameOver.png");
  obstacle1 = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  reset =createSprite(300,100);
  reset.addImage(reset1);
  reset.scale=0.5

  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  


  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
  

  bananatouch = 0;
}

function draw() { 
  background(0);
  
  if(gameState===PLAY){
    for (var i = 0; i < bananasGroup.length; i++) {
      if (bananasGroup.get(i).isTouching(player)) {
        bananasGroup.get(i).remove()
        bananatouch = bananatouch + 1;
        player.scale=player.scale+0.5
      }
    }
     reset.visible=false
     
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnObstacles();
    spawnBananas();
  
    if (obstaclesGroup.isTouching(player)) {

      gameState = END;
      

    }
  } else if (gameState === END) {
    reset1.visible=true
    text("!! GAMEOVER !!", 250, 50);
    
    if (mousePressedOver(reset1)){
        restart();
        }
    



    backgr.velocityX = 0;
    player.velocityY = 0


    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
  }
  

  drawSprites();
  text("SCORE :" + bananatouch, 500, 65);
}
function spawnObstacles() {
  if (frameCount % 120 === 0) {
    var obstacle = createSprite(600, 320, 10, 40);
    obstacle.velocityX = -(6);
    obstacle.addImage(obstacle1);

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   // obstacle.debug = true
    obstacle.setCollider("rectangle", 0, 0, obstacle.width - 70, 250);
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(80, 220));
    banana.addImage(bananasImage);
    banana.scale = 0.05;
    banana.velocityX = -6;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = player.depth;
    player.depth = player.depth + 1;

    //add each cloud to the group
    bananasGroup.add(banana);
  }
}
function restart(){
gameState=PLAY
obstaclesGroup.destroyEach();
bananasGroup.destroyEach();

bananatouch=0



}


