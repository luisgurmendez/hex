import Clock from "./clock";
import CanvasGenerator from "./canvas";
import CustomKeyboard from "./keyboard";
import GameController from "@/controllers/GameController";
// import Stats from "stats.js";
// export const keyboard = CustomKeyboard.getInstance();

class Game {
  private clock: Clock;
  private canvasRenderingContext: CanvasRenderingContext2D;
  private gameController: GameController;

  constructor() {
    this.canvasRenderingContext = CanvasGenerator.generateCanvas();
    this.clock = new Clock();
    this.gameController = new GameController();
    this.clock.start();
  }

  init() { }

  loop = () => {
    return () => {
      this.update();
      requestAnimationFrame(this.loop());
    };
  };

  private update() {
    try {
      // this.level.update(gameApi);
      console.log(this.clock.elapsedTime);
    } catch (e) {
      console.log(e);
    }
  }

};

export default Game;
