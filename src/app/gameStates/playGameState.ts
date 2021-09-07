import { GameStateBase } from "../shared/gameStates/base/gameStateBase";

export class PlayGameState extends GameStateBase {

    public setup() {
        this.gameEngine.asteroidsManager.createAsteroidsField(10);
    }

    public update(timeDelta: number) {
    }

    public handleKeyMouseClick() {
    }

    public nextState() {
    }
}