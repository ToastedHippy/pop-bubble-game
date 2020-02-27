import {Actor} from "./actor/Actor";
import {MulticastOperator} from "rxjs/internal/operators/multicast";
import {MultiTextureActor} from "./actor/multi-texture-actor";
import {AnimatedActor} from "./actor/animated-actor";


export enum EBalloonColor {
    red= 'red',
    green = 'green',
    blue = 'blue',
    yellow = 'yellow'
}

export abstract class Balloon extends AnimatedActor {

    protected static soundsUrls = {
        'pop': 'assets/sounds/balloon-pop.mp3'
    };

    protected constructor() {
        super({interactive: true});
    }
}

export class RedBalloon extends Balloon{

    protected static animationsUrls = {
        'balloon-pop': 'assets/images/balloon-red/sprites.json'
    };

    constructor() {
        super();
    }
}


//
// RedBalloon.textureUrl = 'assets/images/red-balloon.png';
// GreenBalloon.textureUrl = 'assets/images/green-balloon.png';
// BlueBalloon.textureUrl = 'assets/images/blue-balloon.png';
// YellowBalloon.textureUrl = 'assets/images/yellow-balloon.png';

