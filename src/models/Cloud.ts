import {DefineResources} from "./DefineResources.decorator";
import {Actor} from "./actor/Actor";
import {Utils} from "./Utils";

@DefineResources({
    textures: {
        shape1: 'assets/images/cloud1.png',
        shape2: 'assets/images/cloud2.png',
        shape3: 'assets/images/cloud3.png',
        shape4: 'assets/images/cloud4.png',
        shape5: 'assets/images/cloud5.png',
    }
})
export class Cloud extends Actor {

    constructor() {
        super();
    }

    protected createSprite(initialResourceKey?: string): PIXI.Sprite {
        const shapes = Object.keys(this.resourceStore.resources.textures);
        let shape = shapes[Utils.getRandomNumber(0, shapes.length - 1)];
        return super.createSprite(shape);
    }
}
