let app = new PIXI.Application({
  width: 700,
  height: 500,
  antialias: true,
});

document.body.appendChild(app.view);

const stage = new PIXI.Container();
app.stage.addChild(stage);

var boxWidth = app.screen.width / 10;
var boxHeight = app.screen.height / 10;

//the fish

var playerBox = new PIXI.Graphics();
playerBox.beginFill(0x3498db);
playerBox.drawRect(0, 0, boxWidth, boxHeight);
playerBox.endFill();

//the bubble

var square = new PIXI.Graphics();
square.beginFill(0xff0000);
square.drawRect(0, 0, 50, 50);
square.endFill();
square.x = 700;
square.y = Math.floor(Math.random() * 600);

function update() {
  square.position.x -= 5;

  if (playerBox.score > 5) {
    square.position.x -= 6;
  } else if (playerBox.score > 25) {
    square.position.x -= 7;
  } else if (playerBox.score > 40) {
    square.position.x -= 8;
  }
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

stage.addChild(playerBox);
stage.addChild(square);

document.addEventListener('keydown', onKeyDown);

function animate() {
  app.render(stage);

  checkPosition();
  requestAnimationFrame(animate);
}

animate();

function goalBoxSpawn() {
  var randomY = Math.floor(Math.random() * 10 + 0);

  square.position.x = 660;
  square.position.y = boxHeight * randomY;
}
goalBoxSpawn();

const gameOverScreen = new PIXI.Container();
gameOverScreen.visible = false;
app.stage.addChild(gameOverScreen);

let sprite = new PIXI.Graphics();
sprite.beginFill(0x000000);
sprite.drawRect(0, 0, app.view.width, app.view.height);
gameOverScreen.addChild(sprite);

const style = new PIXI.TextStyle({
  fontFamily: 'Roboto',
  fill: ['#ffffff'],
  fontSize: 43,
});

const text = 'GAME OVER';
const styledText = new PIXI.Text(text, style);
gameOverScreen.addChild(styledText);
styledText.x = 230;
styledText.y = 230;

function checkPosition() {
  if (
    square.position.x > playerBox.position.x - boxWidth / 2 &&
    square.position.x < playerBox.position.x + boxWidth / 2 &&
    square.position.y === playerBox.position.y
  ) {
    goalBoxSpawn();
    playerBox.score++;
    playerScore.text = playerBox.score;
  } else if (square.position.x === 0) {
    stage.visible = false;
    gameOverScreen.visible = true;
  }
}

//score functionality

let playerScore;

function score() {
  const style = new PIXI.TextStyle({
    fontFamily: 'Roboto',
    fill: ['#ffffff'],
    fontSize: 43,
  });

  playerBox.score = 0;

  playerScore = new PIXI.Text(playerBox.score, style);

  stage.addChild(playerScore);

  playerScore.x = 650;
  playerScore.y = 10;
}

score();

//Function to move the fish up and down

function onKeyDown(key) {
  if (key.keyCode === 38) {
    if (playerBox.position.y != 0) {
      playerBox.position.y -= boxHeight;
    }
  }

  if (key.keyCode === 40) {
    if (playerBox.position.y != app.screen.height - boxHeight) {
      playerBox.position.y += boxHeight;
    }
  }
}
