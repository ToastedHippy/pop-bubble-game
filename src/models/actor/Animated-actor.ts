import * as PIXI from "pixi.js";
import {Actor, IActorOptions} from "./Actor";
import AnimatedSprite = PIXI.AnimatedSprite;

export abstract class AnimatedActor extends Actor {

    protected readonly sprite: AnimatedSprite;

    protected constructor(options?: IActorOptions) {
        super(options);
    }

    public playAnimation(options?: { loop?: boolean, onComplete?: () => void }) {
        if (options) {
            this.sprite.loop = !!options.loop;

            if (options.onComplete) {
                this.sprite.onComplete = options.onComplete;
            }
        }

        this.sprite.play();
    }

    protected createSprite(initialAnimKey?) {
        if (!initialAnimKey) {
            throw new Error(`you must set initial animation`);
        }
        let animation = this.resourceStore.resources.animations[initialAnimKey];

        if (!animation) {
            throw new Error(`animation ${animation} does not exists`);
        }

        return new AnimatedSprite(animation);
    }
}

