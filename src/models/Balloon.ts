import {Actor} from "./actor/Actor";
import {MulticastOperator} from "rxjs/internal/operators/multicast";
import {MultiTextureActor} from "./actor/multi-texture-actor";


export enum EBalloonColor {
    red= 'red',
    green = 'green',
    blue = 'blue',
    yellow = 'yellow'
}

export class Balloon extends MultiTextureActor {
    public static get colors() {
        return Object.keys(this.texturesUrls) as EBalloonColor[];
    };

    protected static texturesUrls = {
        [EBalloonColor.red]: 'assets/images/red-balloon.png',
        [EBalloonColor.green]: 'assets/images/green-balloon.png',
        [EBalloonColor.blue]: 'assets/images/blue-balloon.png',
        [EBalloonColor.yellow]: 'assets/images/yellow-balloon.png'
    };

    constructor(color: EBalloonColor) {
        super( color, {interactive: true});
    }
}


//
// RedBalloon.textureUrl = 'assets/images/red-balloon.png';
// GreenBalloon.textureUrl = 'assets/images/green-balloon.png';
// BlueBalloon.textureUrl = 'assets/images/blue-balloon.png';
// YellowBalloon.textureUrl = 'assets/images/yellow-balloon.png';

