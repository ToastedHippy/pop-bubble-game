import {MultiTextureActor} from "./actor/multi-texture-actor";

export class Cloud extends MultiTextureActor {

    public static get shapes() {
        return Object.keys(this.texturesUrls)
    }

    public static texturesUrls = {
        shape1: 'assets/images/cloud1.png',
        shape2: 'assets/images/cloud2.png',
        shape3: 'assets/images/cloud3.png',
        shape4: 'assets/images/cloud4.png',
        shape5: 'assets/images/cloud5.png',
    };

    constructor(shape: string) {
        super(shape);
    }
}
