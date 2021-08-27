
import { Justify } from "../components/text/textManager";
import { Keys } from "./../asteroidsGame";
import { GameTimer } from "../gameTimer";
import { GameStateBase } from "../shared/gameStates/base/gameStateBase";
import { InitialGameState } from "./InitialGameState";


export class GameOverState extends GameStateBase {
  timer: GameTimer;

  public setup() {
    this.gameEngine.textManager.write(
      "gameover",
      "GAME OVER",
      this.gameEngine.screenSize.width / 2,
      this.gameEngine.screenSize.height / 2,
      2.3,
      Justify.CENTER);
       
      this.timer=new GameTimer(5000);
      this.timer.start();
    
  }
  public update(timeDelta: number) {
    if(this.timer.expired)
      this.nextState();
  }


  public nextState() {
    this.gameEngine.textManager.clear('gameover');
    this.gameEngine.asteroidsManager.clear();
    this.gameEngine.saucerManager.clear();
    this.gameEngine.gameState = new InitialGameState(this.gameEngine);
  }
}
