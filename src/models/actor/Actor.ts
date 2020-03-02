import * as PIXI from "pixi.js";
import {IActorOptions} from "./actor.interface";
import Sprite = PIXI.Sprite;
import {ResourceStore} from "../Resource-store";

export abstract class Actor {

    public readonly sprite: Sprite;
    public readonly key: string;

    protected readonly resourceStore: ResourceStore;

    protected constructor(key?: string, options?: IActorOptions) {
        this.key = Math.random().toString(36).substr(2, 9);
        this.resourceStore = ResourceStore.instance;
        this.sprite = this.createSprite(key);
        this.configure(options);
    }

    protected createSprite(initialResourceKey?: string) {

        if (initialResourceKey) {
            let initTexture = this.resourceStore.resources.textures[initialResourceKey];
            if (!initTexture) {
                throw new Error(`texture ${initialResourceKey} does not exists`)
            }
            return new Sprite(initTexture);
        } else {
            return new Sprite()
        }
    }

    protected configure(options?: IActorOptions) {
        this.sprite.anchor.set(0.5);
        this.sprite.pivot.set(0.5);

        if (options) {

            if (options.interactive) {
                this.sprite.interactive = true;
                this.sprite.buttonMode = true;
            }

        }
    }

    public move(x?: number, y?: number) {
        this.sprite.position.set(x, y);
    }

    private throwIfSpriteMissed() {
        if (!this.sprite) {
            throw new Error(`sprite does not exists on ${this.constructor.name}`);
        }
    }
}


