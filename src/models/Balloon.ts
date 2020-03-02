import {AnimatedActor} from "./actor/Animated-actor";
import {DefineResources} from "./DefineResources.decorator";
import {Helper} from "./Helper";


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

    public readonly color: string;

    constructor() {
        // TODO make random
        super({interactive: true});
        this.color = 'red';
    }

    protected createSprite(initialAnimKey): PIXI.AnimatedSprite {
        let colors = Object.keys(this.resourceStore.resources.animations);
        let color = Helper.getRandomNumber(0, colors.length - 1);
        return super.createSprite(color);
    }
}

