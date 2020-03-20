import {AnimatedActor} from "./actor/Animated-actor";
import {DefineResources} from "./DefineResources.decorator";
import {Utils} from "./Utils";
import {IActorOptions} from "./actor/Actor";


export enum EBalloonColor {
    red= 'red',
    green = 'green',
    blue = 'blue',
    yellow = 'yellow'
}

@DefineResources({
        sounds: {
            'pop': 'assets/sounds/balloon-pop.mp3'
        },
        animations: {
            'red': 'assets/images/balloon-red/sprites.json'
        }
    })
export class Balloon extends AnimatedActor {

    private _color: string;
    public get color() {
        return this._color;
    }

    constructor() {
        super({interactive: true});
    }

    protected createSprite(): PIXI.AnimatedSprite {
        let colors = Object.keys(this.resourceStore.resources.animations);
        this._color = colors[Utils.getRandomNumber(0, colors.length - 1)];
        return super.createSprite(this._color);
    }

    protected configure(options?: IActorOptions) {
        const ANIMATION_SPEED = 0.6;

        super.configure(options);
        this.sprite.animationSpeed = ANIMATION_SPEED;
    }
}

