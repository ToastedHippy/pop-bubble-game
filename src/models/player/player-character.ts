import {Actor, IActorOptions} from "../actor/Actor";
import {WithResources} from "../DefineResources.decorator";

@WithResources({
    textures: {
        'star': 'assets/images/star.png'
    }
})
export class PlayerCharacter extends Actor {

    constructor() {
        super({initialResourceKey: 'star', interactive: true});
    }
}
