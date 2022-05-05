const Application = PIXI.Application;

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
});

// app.renderer.view.style.position = 'absolute';
document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;

const rectangle = new Graphics();
rectangle.beginFill(0xaa33).drawRect(200, 200, 100, 100).endFill();

app.stage.addChild(rectangle);
