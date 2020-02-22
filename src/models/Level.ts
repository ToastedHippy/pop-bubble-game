import * as PIXI from "pixi.js";
import Container = PIXI.Container;
import LoaderResource = PIXI.LoaderResource;
import {Actor, ActorClass} from "./Actor";
import Renderer = PIXI.Renderer;
import Application = PIXI.Application;

export abstract class Level {

    protected levelContainer = new Container();
    protected app: Application;
    protected actors: {[key: string]: Actor} = {};
    private renderF: (d: number) => void;
    private paused: boolean = false;

    protected constructor() {
    }

    attachTo(app: Application) {
        this.app = app;
        this.app.stage.addChild(this.levelContainer)
    }

    attachRenderF() {
        this.renderF = (delta) => {

            if (!this.paused) {
                this.render(delta);
            }
        };

        this.app.ticker.add(this.renderF);
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }

    detachRenderF() {
        this.app.ticker.remove(this.renderF);
    }

    protected createActor(actorClass: ActorClass) {
        const actor = new actorClass();
        this.actors[actor.key] = actor;
        this.levelContainer.addChild(actor.sprite);
        return actor;
    }

    removeActor(actor: Actor) {
        if (actor.key in this.actors) {
            this.levelContainer.removeChild(actor.sprite);

            delete this.actors[actor.key];
        }
    }

    abstract async init();

    run() {
        this.init().then(() => this.attachRenderF());
    }

    protected abstract render(deltaTime: number): void

    protected async loadActorsTextures(actorClasses: ActorClass[]) {
        return Promise.all(actorClasses.map(ac => ac.loadTexture()))
    }


}
