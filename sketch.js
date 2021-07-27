var shooter, shooterImg;
var bg, bgImg;
var enemy, enemyImg;
var enemyGroup;
var bulletGroup;
var score = 0;
var gameState = 1;
var reset;

function preload() {
  shooterImg = loadImage("shooter.png");
  enemyImg = loadImage("Zombie.png");
  bgImg = loadImage("city.png");
  bg2Img = loadImage("bg2.jpg")
  towerImg = loadImage("tower.png");
  sunset11Img = loadImage("sunset11.png");
  sunset8Img = loadImage("sunset8.png")
  sunrise4Img = loadImage("sunrise4.png");
  gameOverImg = loadImage("gameOver.jpeg");
  skeletonImg = loadImage("skeleton.png");
  skeleton2Img = loadImage("skeleton2.png");
  batImg = loadImage("bat.png")
  enemy2Img = loadImage("enemy.png");
  bulletImg = loadImage('bullet.png');
  bulletSound = loadSound("bullet.wav");
  gameOverSound = loadSound("GameOver.wav");
  youWonSound = loadSound("Youwon sound.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);


  player = createSprite(200, 200, 10, 50);
  player.addImage(shooterImg);
  player.scale = 0.5;
  //player.debug = true;
  player.setCollider("rectangle", 0, 0, 150, 300);
  bulletGroup = new Group();
  enemyGroup = new Group();
}

function draw() {
  background(bgImg);

  if (keyDown("r")) {
    gameState = 1;
    score = 0;
    player.x = 200;
    player.y = 200;
  }

  if (keyDown("UP_ARROW")) {
    player.y = player.y - 30;
  }
  if (keyDown("DOWN_ARROW")) {
    player.y = player.y + 30;
  }

  if (keyDown("space")) {
    shootBullet();
  }

  if (bulletGroup.isTouching(enemyGroup)) {
    for (var i = 0; i < enemyGroup.length; i++) {
      if (enemyGroup[i].isTouching(bulletGroup)) {
        enemyGroup[i].destroy();

        bulletGroup.destroyEach();
        score = score + 5;
      }
    }
  }

  if (enemyGroup.isTouching(player)) {
    gameState = 7;

  }


  if (gameState === 1) {
    spawnZombies(-5, enemyImg);
    textSize(30)
    fill("black")
    text("Level 1 ", width - 500, 50)


  }

  if (score > 50 && score < 100) {
    gameState = 2;
  }
  if (gameState === 2) {
    spawnZombies(-7, skeletonImg);
    background(bg2Img);
    textSize(30)
    fill("white")
    text("Level 2 ", width - 500, 50)

  }
  if (score > 100 && score < 150) {
    gameState = 3;
  }

  if (gameState === 3) {
    spawnZombies(-9, skeleton2Img);
    background(sunrise4Img);
    textSize(30);
    fill("white");
    text("Level 3", width - 500, 50);
  }
  if (score > 150 && score < 200) {
    gameState = 4;
  }
  if (gameState === 4) {
    spawnZombies(-11, batImg);
    background(sunset8Img);
    textSize(30);
    fill("white");
    text("Level 4", width - 500, 50);
  }

  if (score > 200 && score < 250) {
    gameState = 5;
  }
  if (gameState === 5) {
    spawnZombies(-13, enemy2Img)
    background(sunset11Img);
    textSize(30);
    fill("white");
    text("Level 5", width - 500, 50);
  }

  if (score > 250 && score < 300) {
    gameState = 6;
  }

  if (gameState === 6) {
    push();
    youWonSound.play();
    pop();
    background(towerImg);
    textSize(30);
    player.x = windowWidth / 2;
    player.y = windowHeight / 2;
    fill("white");
    textAlign(CENTER)
    textSize(50);
    text("You Won", 500, 500);
    enemyGroup.destroyEach()
    bulletGroup.destroyEach();
  }

  if (gameState === 7) {
    background(gameOverImg)
    enemyGroup.destroyEach();
    bulletGroup.destroyEach();
    text("You Lost!!!", windowWidth / 2, windowHeight / 2 - 100);
    text("Press R to restart", windowWidth / 2, windowHeight / 2 + 200);
    push();
    gameOverSound.play();
    pop();
  }

  drawSprites();
  textSize(30);
  text("Score  :  " + score, width - 300, 50);

}

function spawnZombies(velX, img) {
  if (frameCount % 40 === 0) {
    enemy = createSprite(random(500, 1200), random(100, 500), 40, 40);
    enemy.addImage(img);
    enemy.velocityX = velX;
    enemy.lifetime = 800;
    //enemy.debug = true;
    enemy.scale = 0.72;
    enemyGroup.add(enemy);

  }
}

function shootBullet() {
  bullet = createSprite(200, 200, 20, 10);
  bullet.velocityX = 10;
  
  bulletSound.play();
  
  bullet.x = player.x;
  bullet.y = player.y;
  bullet.lifetime = 500;
  bullet.addImage(bulletImg);
  bullet.scale = 0.2
  bulletGroup.add(bullet);
}

