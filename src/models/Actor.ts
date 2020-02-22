import * as PIXI from "pixi.js";
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import Loader = PIXI.Loader;

export class Actor {
    protected _sprite: Sprite;
    get sprite() { return this._sprite; }

    protected static texture: Texture;
    readonly key: string;

    constructor(options?: IActorOptions) {
        this.key = Math.random().toString(36).substr(2, 9);

        if (!this.constructor['texture']) {
            throw new Error('you must load texture first');
        }

        this._sprite = new Sprite(this.constructor['texture']);
        this._sprite.anchor.set(0.5);
        this._sprite.pivot.set(0.5);

        if (options) {

            if (options.interactive) {
                this._sprite.interactive = true;
                this._sprite.buttonMode = true;
            }

        }
    }

    public move(x?: number, y?: number) {
        this._sprite.position.set(x, y);
    }

    public static textureUrl: string;

    public static async loadTexture() {

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

const test: ActorClass = Actor;

export interface IActorOptions {
    interactive?: boolean;
}

export type ActorClass = {
    loadTexture: () => Promise<unknown>;
    new (): Actor;
}
