(function () {
  var renderer = PIXI.autoDetectRenderer(660, 660, {
    backgroundColor: 0xffff,
    antialias: true,
  });
  document.body.appendChild(renderer.view);

  const app = new PIXI.Application({
    width: 500,
    height: 500,
    transparent: false,
    antialias: true,
  });

  var stage = new PIXI.Container();
  var boxWidth = renderer.width / 20;
  var boxHeight = renderer.height / 10;

  // Sprite Fish
  var playerBox = new PIXI.Sprite.from('../fish.png');
  playerBox.width = 100;
  playerBox.height = 100;

  // Add sprite Bubble
  var square = new PIXI.Graphics();
  square.beginFill(0xff0000);
  square.drawRect(0, 0, 50, 50);
  square.endFill();
  square.x = 700;
  square.y = Math.floor(Math.random() * 600);

  function update() {
    square.position.x -= 5;

    if (playerBox.score >= 5) {
      square.position.x -= 5.1;
    } else if (playerBox.score >= 18) {
      square.position.x -= 5.2;
    } else if (playerBox.score >= 25) {
      square.position.x -= 5.3;
    } else if (playerBox.score >= 32) {
      square.position.x -= 5.4;
    } else if (playerBox.score >= 40) {
      square.position.x -= 5.6;
    }

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);

  stage.addChild(playerBox);
  stage.addChild(square);

  document.addEventListener('keydown', onKeyDown);

  goalBoxSpawn();

  animate();

  function animate() {
    renderer.render(stage);

    checkPosition();
    requestAnimationFrame(animate);
  }

  function goalBoxSpawn() {
    var randomY = Math.floor(Math.random() * 10 + 0);

    square.position.x = 660;
    square.position.y = boxHeight * randomY;
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
      console.log('Hejsan');
    }
  }

  //score functionality

  let playerScore;

  function setup() {
    const style = new PIXI.TextStyle({
      fontFamily: 'Roboto',
      fill: ['#ffffff'],
      fontSize: 43,
    });

    playerBox.score = 0;

    playerScore = new PIXI.Text(playerBox.score, style);

    stage.addChild(playerScore);

    playerScore.x = 750;
    playerScore.y = 10;
  }

  setup();

  function onKeyDown(key) {
    if (key.keyCode === 38) {
      if (playerBox.position.y != 0) {
        playerBox.position.y -= boxHeight;
      }
    }

    if (key.keyCode === 40) {
      if (playerBox.position.y != renderer.height - boxHeight) {
        playerBox.position.y += boxHeight;
      }
    }
  }
})();
