import * as PIXI from "pixi.js";
import Container = PIXI.Container;
import LoaderResource = PIXI.LoaderResource;
import {Actor} from "./actor/Actor";
import Renderer = PIXI.Renderer;
import Application = PIXI.Application;
import {GameState} from "./game-state";

export abstract class Level {

    protected levelContainer = new Container();
    protected app: Application;
    protected actors: {[key: string]: Actor} = {};
    private readonly renderF: (d: number) => void;
    protected gameState: GameState;

    protected constructor() {
        this.gameState = GameState.instance;

        this.renderF = (delta) => {

            if (!this.gameState.paused) {
                this.render(delta);
            }
        };
    }

    attachToApp(app: Application) {
        this.app = app;
        this.app.stage.addChild(this.levelContainer)
    }

    attachRenderF() {
        this.app.ticker.add(this.renderF);
    }

    detachRenderF() {
        this.app.ticker.remove(this.renderF);
    }

    protected attachActor(actor: Actor) {
        this.actors[actor.key] = actor;
        this.levelContainer.addChild(actor.sprite);
    }

    removeActor(actor: Actor) {
        if (actor.key in this.actors) {
            this.levelContainer.removeChild(actor.sprite);

            delete this.actors[actor.key];
        }
    }

    public abstract async init();

    run() {
        this.init()
            .then(() => this.attachRenderF());
    }

    protected abstract render(deltaTime: number): void

}
