var balloon;

var database;

var position;

function preload() {

  backgroundImg = loadImage("sprites/Hot Air Ballon-01.png")
  balloonAnimation = loadAnimation("sprites/Hot Air Ballon-02.png", "sprites/Hot Air Ballon-03.png", "sprites/Hot Air Ballon-04.png")


}

function setup() {
  createCanvas(1200, 600);

  database = firebase.database();
  balloon = createSprite(600, 320, 50, 50);
  balloon.addAnimation("balloon", balloonAnimation);
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readHeight, showError);

}

function draw() {
  background(backgroundImg);

  if (keyDown(LEFT_ARROW)) {
     updateHeight(-10, 0);
  }
  else if (keyDown(RIGHT_ARROW)) {
    updateHeight(10, 0);
  }
  else if (keyDown(UP_ARROW)) {
   updateHeight(0, -10);
  }
  else if (keyDown(DOWN_ARROW)) {
    updateHeight(0, 10);
  }

 

  text("Use arrow keys to move hot air balloon. ", 100, 50);

  drawSprites();
}

function updateHeight(x, y) {

  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })

}

function readHeight(data) {
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y

}

function showError() {
  console.log("Error in writing to the database");

}