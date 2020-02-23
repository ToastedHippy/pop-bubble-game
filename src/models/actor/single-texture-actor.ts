import * as PIXI from "pixi.js";
import {Actor} from "./Actor";
import Sprite = PIXI.Sprite;
import {IActorOptions, ILoadResources} from "./actor.interface";
import Loader = PIXI.Loader;
import Texture = PIXI.Texture;

export const SingleTextureActor = class extends Actor {
    public sprite: Sprite;

    constructor(options?: IActorOptions) {
        super();
        this.sprite = new Sprite(this.constructor['texture']);
        this.configure(options);
    }

    protected static texture: Texture;
    protected static textureUrl: string;

    public static loadResources() {
        if (!this.textureUrl) {
            throw new Error(`textureUrl does not set on class ${this.name}`);
        }

        return new Promise((resolve, reject) => {
            const loader = new Loader();
            loader.add(this.name, this.textureUrl);
            loader.load((loader, resources) => {
                this.texture = resources[this.name].texture;
                resolve();
            });
            loader.on('error', error => reject(error))
        })
    }
}

