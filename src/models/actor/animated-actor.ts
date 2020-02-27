import * as PIXI from "pixi.js";
import {Actor} from "./Actor";
import AnimatedSprite = PIXI.AnimatedSprite;
import {IActorOptions} from "./actor.interface";
import Texture = PIXI.Texture;
import Loader = PIXI.Loader;

export class AnimatedActor extends Actor {
    // TODO make animations be in single form (Not Record and just Texture[])
    protected static animations: Record<string, Texture[]>;
    protected static animationsUrls: Record<string, string>;

    public static async loadResources() {
        if (!this.animationsUrls || !Object.keys(this.animationsUrls).length) {
            throw new Error(`animationsUrls does not set on class ${this.name}`);
        }

        await Actor.loadResources.call(this);

        this.animations = {};

        return new Promise((resolve, reject) => {
            const loader = new Loader();

            for (const key in this.animationsUrls) {
                loader.add(key, this.animationsUrls[key]);
            }

            loader.load((loader, resources) => {

                for (const key in resources) {
                    if (resources[key].textures) {
                        this.animations[key] = Object.values(resources[key].textures);
                    }
                }

                resolve();
            });

            loader.on('error', error => reject(error))
        })
    }

    public readonly sprite: AnimatedSprite;
    protected currentAnimationKey: string;

    constructor(options?: IAnimatedActorOptions) {
        let {interactive} = options;
        super();
        if (!this.constructor['animations'] || !Object.keys(this.constructor['animations']).length) {
            throw new Error(`define some animation on ${this.constructor.name}`);
        }

        let initialAnimationKey = options.initialAnimKey ? options.initialAnimKey : Object.keys(this.constructor['animations'])[0];
        let initialAnimation = this.constructor['animations'][initialAnimationKey];

        if (!initialAnimation) {
            throw new Error(`could not get initial animation on ${this.constructor.name}`)
        }
        this.currentAnimationKey = initialAnimationKey;
        this.sprite = new AnimatedSprite(initialAnimation);
        this.configure({interactive});
        //TODO get reed of hardcode
        this.sprite.animationSpeed = 0.6;
    }

    playAnimation(options?: {animationKey?: string, loop?: boolean, onComplete?: () => void}) {
        if (options) {
            this.sprite.loop = options.loop;

            if(options.animationKey && this.currentAnimationKey !== options.animationKey) {

            }

            if (options.onComplete) {
                this.sprite.onComplete = options.onComplete;
            }
        }

        this.sprite.play();
    }


}

interface IAnimatedActorOptions extends IActorOptions {
    initialAnimKey?: string
}
