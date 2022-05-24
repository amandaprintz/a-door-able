let app = new PIXI.Application({
  width: 700,
  height: 500,
  antialias: true,
});

// background sound
PIXI.sound.add('sound', 'resources/mermaid.mp3');

document.body.appendChild(app.view);

var boxWidth = app.screen.width / 10;
var boxHeight = app.screen.height / 10;

const startPage = new PIXI.Container();
app.stage.addChild(startPage);

const image = new PIXI.Sprite.from('resources/bg.svg');
startPage.addChild(image);
image.width = app.screen.width;
image.height = app.screen.height;
image.buttonMode = true;
image.interactive = true;
image.on('click', startClick);

function startClick() {
  startPage.visible = false;
  stage.visible = true;
  PIXI.sound.play('sound');
  requestAnimationFrame(update);
}

const stage = new PIXI.Container();
stage.visible = false;
app.stage.addChild(stage);

//the background

const stageBackground = new PIXI.Sprite.from('resources/playbakground.svg');
stage.addChild(stageBackground);
stageBackground.width = app.screen.width;
stageBackground.height = app.screen.height;

//the fish

const playerBox = new PIXI.Sprite.from('../fish.png');
playerBox.width = 110;
playerBox.height = 110;

//the bubble

const square = new PIXI.Sprite.from('../bubble.svg');
square.width = 50;
square.height = 50;
/* square.y = Math.floor(Math.random() * 600);
 */

stage.addChild(playerBox);
stage.addChild(square);

function update() {
  square.position.x -= 5;

  if (playerBox.score > 8) {
    square.position.x -= 6;
  } else if (playerBox.score > 25) {
    square.position.x -= 7;
  } else if (playerBox.score > 40) {
    square.position.x -= 8;
  }
  requestAnimationFrame(update);
}

//score functionality

let playerScore;

function score() {
  const style = new PIXI.TextStyle({
    fontFamily: 'Roboto',
    fontSize: 43,
  });

  playerBox.score = 0;

  playerScore = new PIXI.Text(playerBox.score, style);

  stage.addChild(playerScore);

  playerScore.x = 650;
  playerScore.y = 10;
}

score();

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

// game over screen
const gameOverScreen = new PIXI.Container();
gameOverScreen.visible = false;
app.stage.addChild(gameOverScreen);

let sprite = new PIXI.Graphics();
sprite.beginFill(0x000000);
sprite.drawRect(0, 0, app.view.width, app.view.height);
gameOverScreen.addChild(sprite);

const style = new PIXI.TextStyle({
  fontFamily: 'Modak',
  fill: ['#4A8B9F'],
  fontSize: 50,
});

const text = 'GAME OVER';
const styledText = new PIXI.Text(text, style);
gameOverScreen.addChild(styledText);
styledText.x = 230;
styledText.y = 150;

const rerun = new PIXI.Sprite.from('../rerun.svg');
gameOverScreen.addChild(rerun);
rerun.width = 400;
rerun.height = 100;
rerun.x = 140;
rerun.y = 230;
rerun.buttonMode = true;
rerun.interactive = true;
rerun.on('click', onClick);
gameOverScreen.addChild(rerun);

function onClick() {
  location.reload();
}

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
    gameOverScreen.visible = true;
    stage.visible = false;
    startPage.visible = false;
  }
}

//Function to move the fish up and down

document.addEventListener('keydown', onKeyDown);

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
