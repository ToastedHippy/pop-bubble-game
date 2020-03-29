import * as PIXI from "pixi.js";
import Container = PIXI.Container;
import LoaderResource = PIXI.LoaderResource;
import {Actor} from "./actor/Actor";
import Renderer = PIXI.Renderer;
import Application = PIXI.Application;
import {GameState} from "./Game-state";
import {ResourceStore} from "./Resource-store";
import {LoadingIndicator} from "./Loading-indicator";
import {LoadingScreen} from "./Loading-screen";

export abstract class Level {

    protected levelContainer = new Container();
    protected app: Application;
    protected actors: {[key: string]: Actor} = {};
    private readonly renderF: (d: number) => void;
    protected gameState: GameState;
    protected resourcesStore: ResourceStore;
    private loadingScreen: LoadingScreen;

    protected constructor() {
        this.gameState = GameState.instance;
        this.resourcesStore = ResourceStore.instance;
        this.loadingScreen = new LoadingScreen({text: 'Loading assets: '});

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
        actor.attachToContainer(this.levelContainer);
    }

    removeActor(actor: Actor) {
        if (actor.key in this.actors) {
            actor.removeFromParentContainer();
            delete this.actors[actor.key];
        }
    }

    public abstract async init();

    run() {
        this.init()
            .then(() => this.attachRenderF());
    }

    protected abstract render(deltaTime: number): void;

    protected showLoadingScreen() {
        this.loadingScreen.show();
    }

    protected hideLoadingScreen() {
        this.loadingScreen.hide();
    }

    protected updateLoadingState(newValue: number) {
        this.loadingScreen.updateIndicator(newValue);
    }

}
