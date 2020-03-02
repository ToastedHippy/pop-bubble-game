import * as PIXI from "pixi.js";
import {Actor} from "./Actor";
import AnimatedSprite = PIXI.AnimatedSprite;
import {IActorOptions} from "./actor.interface";

export abstract class AnimatedActor extends Actor {

    public readonly sprite: AnimatedSprite;
    protected currentAnimationKey: string;

    protected constructor(options?: IAnimatedActorOptions) {
        let {interactive} = options;
        super(options.initialAnimKey,{interactive});

        //TODO get reed of hardcode
        this.sprite.animationSpeed = 0.6;
    }

    protected createSprite(initialAnimKey?) {
        this.currentAnimationKey = initialAnimKey ? initialAnimKey : Object.keys(this.resourceStore.resources.animations)[0];

        if (!this.currentAnimationKey) {
            throw new Error(`animation ${this.currentAnimationKey} does not exists`)
        }

        return new AnimatedSprite(this.resourceStore.resources.animations[this.currentAnimationKey])
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
