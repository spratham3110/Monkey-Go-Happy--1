var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var score1 = 0;

var ground,groundImage, ground2;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;

function preload(){ 
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  groundImage = loadImage("ground.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400,300);
  background("white");

  monkey = createSprite(80,200,15,15);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,280,200,15);
  ground.addImage(groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -5;
  
  ground2 = createSprite(200,290,400,7.5);
  ground2.visible = false;
    
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
}

function draw() {
  background("white");
  
    stroke("yellow");
    textSize(20);
    fill("brown")
    text("Survival Time: "+score,130,30);
  
    stroke("brown");
    textSize(20);
    fill("yellow")
    text("Banana: "+score1,150,50);
  
    if (gameState === PLAY) {
      score = Math.ceil(frameCount/frameRate()); 
      
      if (ground.x < 0) {
        ground.x = ground.width/2;
      }
      if (foodGroup.isTouching(monkey)) {
        foodGroup.destroyEach();
        score1 = score1 +1;
      }
      monkey.velocityY = monkey.velocityY + 0.8
      
      ground.depth = obstacleGroup.depth;
      obstacleGroup.depth = obstacleGroup.depth +1;
        
      spawnFood();
      spawnObstacles();
        
      if (obstacleGroup.isTouching(monkey)) {
        gameState = END;
      }
    } 
    else if (gameState === END) {
      ground.velocityX = 0;
      monkey.velocityY = 0; 
        
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
     
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);    
    }
    monkey.collide(ground2);
    
    if (keyDown("space")&& monkey.y >= 180) {
        monkey.velocityY = -12
      }
  
    ground.depth = monkey.depth;
    monkey.depth = monkey.depth +1;
  
  drawSprites();
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,100,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(80,180));
    banana.scale = 0.08;
    banana.velocityX = -4;
    banana.lifetime = 200;
    foodGroup.add(banana);
  }
}
function spawnObstacles() {
  if (frameCount % 120 === 0) {
    obstacle = createSprite(500,250,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}