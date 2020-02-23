import * as PIXI from 'pixi.js'
import {IActorOptions, ILoadResources} from "./actor.interface";
import {Actor} from "./Actor";
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import Loader = PIXI.Loader;

export class MultiTextureActor extends Actor {
    public readonly sprite: Sprite;
    protected readonly textureKey: string;

    constructor(textureKey: string, options?: IActorOptions) {
        super();
        this.textureKey = textureKey;
        this.sprite = new Sprite(this.constructor['textures'][this.textureKey]);
        this.configure(options);
    }

    protected static textures: Record<string, Texture>;
    protected static texturesUrls: Record<string, string>;
    public static loadResources() {

        if (!this.texturesUrls || !Object.keys(this.texturesUrls).length) {
            throw new Error(`texturesUrls does not set on class ${this.name}`);
        }

        this.textures = {};

        return new Promise((resolve, reject) => {
            const loader = new Loader();

            for (const key in this.texturesUrls) {
                loader.add(key, this.texturesUrls[key]);
            }

            loader.load((loader, resources) => {

                for (const key in resources) {
                    this.textures[key] = resources[key].texture;
                }

                resolve();
            });

            loader.on('error', error => reject(error))
        })
    }
}
