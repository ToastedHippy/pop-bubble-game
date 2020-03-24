import {AnimatedActor} from "./actor/Animated-actor";
import {WithResources} from "./DefineResources.decorator";
import {Utils} from "./Utils";
import {IActorOptions} from "./actor/Actor";
import {SoundComponent} from "./actor-components/sound-component";
import { ResourceStore } from "./Resource-store";


export enum EBalloonColor {
    red= 'red',
    green = 'green',
    blue = 'blue',
    yellow = 'yellow'
}

@WithResources({
        sounds: {
            'pop': 'assets/sounds/balloon-pop.mp3'
        },
        animations: {
            'red': 'assets/images/balloon-red/sprites.json',
            'blue': 'assets/images/balloon-red/sprites.json'
        }
    })
export class Balloon extends AnimatedActor {

    private _color: string;
    public get color() {
        return this._color;
    }
    public static get availableColors() {
        return Object.keys(ResourceStore.instance.getResouresDefsOf(Balloon).animations || []);
    }
    private soundComponent: SoundComponent;

    constructor() {
        super({interactive: true});
        this.soundComponent = this.addComponent<SoundComponent>(SoundComponent)
            .attachSound('pop', this.resourceStore.resources.sounds['pop']);
    }

    protected createSprite(): PIXI.AnimatedSprite {
        let colors = Balloon.availableColors;
        this._color = colors[Utils.getRandomNumber(0, colors.length - 1)];
        return super.createSprite(this._color);
    }

    protected configure(options?: IActorOptions) {
        const ANIMATION_SPEED = 0.6;

        super.configure(options);
        this.sprite.animationSpeed = ANIMATION_SPEED;
    }

    public playSound(key: string) {
        this.soundComponent.playSound(key);
    }
}

