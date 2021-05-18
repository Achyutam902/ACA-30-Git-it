function preload() {
  //load game assets
  bgImage = loadImage("images/bg.png");
  bunnyImage = loadImage("images/bunnyImg.png");
  carrotImage = loadImage("images/carrot.png");
  snakeImage = loadImage("images/snake.png");
  brickImage = loadImage("images/brick.jpg");

}

var edges;
var bg, bgImage;
var bunny, bunnyImage;
var carrot, carrotImage;
var brickImage, bricksGroup, bricksGenerator, bricksGenerator2;
var snakeImage, snakesGroup, snakesGenerator;


function setup() {
  createCanvas(600, 600);
  bg = createSprite(570, 300);
  bg.addImage(bgImage);
  bg.scale = 4.65;

  bunny = createSprite(40, 550, 30, 30);
  bunny.addImage(bunnyImage);
  bunny.shapeColor = "white";
  bunny.scale = 0.25;

  carrot = createSprite(560, 40, 30, 30);
  carrot.addImage(carrotImage);
  carrot.shapeColor = "pink";
  carrot.scale = 0.25;

  edges = createEdgeSprites();
  bricksGroup = new Group();
  snakesGroup = new Group();
}

function draw() {
  background("green");
  bunny.bounceOff(edges[0]);
  bunny.bounceOff(edges[1]);
  bunny.bounceOff(edges[2]);
  bunny.bounceOff(edges[3]);
  if (keyDown("up")) {
    bunny.y = bunny.y - 3;
  }
  if (keyDown("down")) {
    bunny.y = bunny.y + 3;
  }
  if (keyDown("left")) {
    bunny.x = bunny.x - 3;
  }
  if (keyDown("right")) {
    bunny.x = bunny.x + 3;
  }

  brickGenerator();
  bricksGenerator2();
  snakesGenerator();

  for (var i = 0; i < (bricksGroup).length; i++) {
    var temp = bricksGroup.get(i);
    if (bunny.isTouching(temp)) {
      bunny.x = 40;
      bunny.y = 550;
    }
  }

  for (var i = 0; i < (snakesGroup).length; i++) {
    var temp = snakesGroup.get(i);
    if (bunny.isTouching(temp)) {
      bunny.x = 40;
      bunny.y = 550;
    }
  }
  drawSprites();
  textSize(50);
  fill("blue");
  if (bunny.isTouching(carrot)) {
    text("YOU WIN", 200, 100);
  }
}

function brickGenerator() {
  if (frameCount % 50 === 0) {
    var brick1 = createSprite(650, 200, 80, 20);
    brick1.addImage(brickImage);
    brick1.scale = 0.25;
    brick1.velocityX = -3;
    brick1.lifetime = 250;
    bricksGroup.add(brick1);

  }
}

function bricksGenerator2() {
  if (frameCount % 60 === 0) {
    var brick2 = createSprite(650, 350, 80, 20);
    brick2.addImage(brickImage);
    brick2.scale = 0.25;
    brick2.velocityX = -3;
    brick2.lifetime = 250;
    bricksGroup.add(brick2);
  }
}

function snakesGenerator() {
  if (frameCount % 50 === 0) {
    var snake = createSprite(600, random(70, 520), random(30, 120), 5);
    snake.addImage(snakeImage);
    snake.scale = random(0.1, 0.4);
    snake.velocityX = random(-1, -5);
    snakesGroup.add(snake);
  }
}