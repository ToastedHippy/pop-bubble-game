import * as PIXI from "pixi.js";
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import Loader = PIXI.Loader;
import {IActorOptions} from "./actor.interface";

export abstract class Actor {
    public readonly abstract sprite: Sprite;

    readonly key: string;

    protected constructor() {
        this.key = Math.random().toString(36).substr(2, 9);
    }

    configure(options?: IActorOptions) {
        this.throwIfSpriteMissed();

        this.sprite.anchor.set(0.5);
        this.sprite.pivot.set(0.5);

        if (options) {

            if (options.interactive) {
                this.sprite.interactive = true;
                this.sprite.buttonMode = true;
            }

        }
    }

    private throwIfSpriteMissed() {
        if (!this.sprite) {
            throw new Error(`sprite does not exists on ${this.constructor.name}`);
        }
    }

    public move(x?: number, y?: number) {
        this.throwIfSpriteMissed();

        this.sprite.position.set(x, y);
    }
}


