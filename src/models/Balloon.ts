import {Actor} from "./Actor";


export class Balloon extends Actor {

    constructor() {
        super( {interactive: true});
    }
}

export class RedBalloon extends Balloon {
    constructor() {super();}
}
export class GreenBalloon extends Balloon {
    constructor() {super();}
}
export class BlueBalloon extends Balloon {
    constructor() {super();}
}
export class YellowBalloon extends Balloon {
    constructor() {super();}
}

RedBalloon.textureUrl = 'assets/images/red-balloon.png';
GreenBalloon.textureUrl = 'assets/images/green-balloon.png';
BlueBalloon.textureUrl = 'assets/images/blue-balloon.png';
YellowBalloon.textureUrl = 'assets/images/yellow-balloon.png';

