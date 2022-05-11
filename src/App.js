// const Application = PIXI.Application;

// const app = new Application({
//   width: window.innerWidth,
//   height: window.innerHeight,
// });

// // app.renderer.view.style.position = 'absolute';
// document.body.appendChild(app.view);

// const Graphics = PIXI.Graphics;

// const rectangle = new Graphics();
// rectangle.beginFill(0xaa33).drawRect(200, 200, 100, 100).endFill();

// app.stage.addChild(rectangle);

(function () {
  var renderer = PIXI.autoDetectRenderer(660, 660, {
    backgroundColor: 0x34495e,
    antialias: true,
  });
  document.body.appendChild(renderer.view);

  var stage = new PIXI.Container();

  var boxWidth = renderer.width / 10;
  var boxHeight = renderer.height / 10;

  var playerBox = new PIXI.Graphics();

  playerBox.beginFill(0x3498db);
  playerBox.drawRect(0, 0, boxWidth, boxHeight);
  playerBox.endFill();

  var square = new PIXI.Graphics();
  square.beginFill(0xff0000);
  square.drawRect(0, 0, 50, 50);
  square.endFill();
  square.x = 700;
  square.y = Math.floor(Math.random() * 600);

  function update() {
    square.position.x -= 5;

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
    } else if (square.position.x === 0) {
      console.log('Hejsan');
    }
  }

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
