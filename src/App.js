//The canvas
let app = new PIXI.Application({
  width: 710,
  height: 500,
  antialias: true,
});

//Background sound
PIXI.sound.add('sound', 'resources/mermaid.mp3');

document.body.appendChild(app.view);

var boxWidth = app.screen.width / 10;
var boxHeight = app.screen.height / 10;

//Start page

const startPage = new PIXI.Container();
app.stage.addChild(startPage);

const image = new PIXI.Sprite.from('resources/instructions.svg');
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

//Game page

const stage = new PIXI.Container();
stage.visible = false;
app.stage.addChild(stage);

const stageBackground = new PIXI.Sprite.from('resources/playbg.svg');
stage.addChild(stageBackground);
stageBackground.width = app.screen.width;
stageBackground.height = app.screen.height;

//The fish

const fish = new PIXI.Sprite.from('resources/fish.png');
fish.width = 60;
fish.height = 60;

//The bubble

const bubble = new PIXI.Sprite.from('resources/bubble.svg');
bubble.width = 50;
bubble.height = 50;

stage.addChild(fish);
stage.addChild(bubble);

// Function for bubble speed

function update() {
  bubble.position.x -= 5;

  if (fish.score > 8) {
    bubble.position.x -= 6;
  } else if (fish.score > 25) {
    bubble.position.x -= 7;
  } else if (fish.score > 40) {
    bubble.position.x -= 8;
  }
  requestAnimationFrame(update);
}

//Function to add score functionality

let playerScore;

function score() {
  const style = new PIXI.TextStyle({
    fontFamily: 'Futura',
    fontSize: 60,
    fill: ['#05465A'],
  });

  fish.score = -1;

  playerScore = new PIXI.Text(fish.score, style);

  stage.addChild(playerScore);

  playerScore.x = 650;
  playerScore.y = 10;
}

score();

// Function to animate the game

function animate() {
  app.render(stage);

  checkPosition();
  requestAnimationFrame(animate);
}

animate();

//Function to randomize a new bubble on the y-axel

function goalBoxSpawn() {
  var randomY = Math.floor(Math.random() * 10 + 0);

  bubble.position.x = 660;
  bubble.position.y = boxHeight * randomY;
}
goalBoxSpawn();

// Game over screen
const gameOverScreen = new PIXI.Container();
gameOverScreen.visible = false;
app.stage.addChild(gameOverScreen);

let sprite = new PIXI.Graphics();
sprite.beginFill(0x000000);
sprite.drawRect(0, 0, app.view.width, app.view.height);
gameOverScreen.addChild(sprite);

const style = new PIXI.TextStyle({
  fontFamily: 'Futura',
  fill: ['#4A8B9F'],
  fontSize: 45,
});

const text = 'GAME OVER';
const styledText = new PIXI.Text(text, style);
gameOverScreen.addChild(styledText);
styledText.x = 195;
styledText.y = 130;

const rerun = new PIXI.Sprite.from('resources/rerun.svg');
gameOverScreen.addChild(rerun);
rerun.width = 400;
rerun.height = 100;
rerun.x = 140;
rerun.y = 230;
rerun.buttonMode = true;
rerun.interactive = true;
rerun.on('click', onClick);

function onClick() {
  gameOverScreen.visible = false;
  stage.visible = true;
  fish.score = 0;
  playerScore.text = fish.score;
  goalBoxSpawn();
}

//Function to know when the fish and bubble collide

function checkPosition() {
  if (
    bubble.position.x > fish.position.x - boxWidth / 2 &&
    bubble.position.x < fish.position.x + boxWidth / 2 &&
    bubble.position.y === fish.position.y
  ) {
    goalBoxSpawn();
    fish.score++;
    playerScore.text = fish.score;
  } else if (bubble.position.x === 0) {
    gameOverScreen.visible = true;
    stage.visible = false;
    startPage.visible = false;
  }
}

//Function to move the fish up and down

document.addEventListener('keydown', onKeyDown);

function onKeyDown(key) {
  if (key.keyCode === 38) {
    if (fish.position.y != 0) {
      fish.position.y -= boxHeight;
    }
  }

  if (key.keyCode === 40) {
    if (fish.position.y != app.screen.height - boxHeight) {
      fish.position.y += boxHeight;
    }
  }
}
