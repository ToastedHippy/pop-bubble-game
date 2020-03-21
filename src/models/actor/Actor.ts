import * as PIXI from "pixi.js";
import Sprite = PIXI.Sprite;
import {ResourceStore} from "../Resource-store";
import Container = PIXI.Container;
import {isNumeric} from "rxjs/internal-compatibility";
import {ActorComponent, ActorComponentType} from "../actor-components/actor-component";

export abstract class Actor {

    protected readonly sprite: Sprite;
    public readonly key: string;
    private components: Record<string, ActorComponent>;

    public get height() { return this.sprite.height; }
    public get width() { return this.sprite.width; }
    public get x() { return this.sprite.x; }
    public get y() { return this.sprite.y; }

    protected readonly resourceStore: ResourceStore;

    protected constructor(options?: IActorOptions) {
        this.key = Math.random().toString(36).substr(2, 9);
        this.resourceStore = ResourceStore.instance;
        this.components = {};

        this.sprite = this.createSprite(options && options.initialResourceKey);
        this.configure(options);
    }

    public on(event: string, fn: Function) {
        this.sprite.on(event, fn)
    }

    protected createSprite(initialResourceKey?: string) {

        if (initialResourceKey) {
            let initTexture = this.resourceStore.resources.textures[initialResourceKey];
            if (!initTexture) {
                throw new Error(`texture ${initialResourceKey} does not exists`)
            }
            return new Sprite(initTexture);
        } else {
            return new Sprite()
        }
    }

    protected configure(options?: IActorOptions) {
        this.sprite.anchor.set(0.5);
        this.sprite.pivot.set(0.5);

        if (options) {

            if (options.interactive) {
                this.sprite.interactive = true;
                this.sprite.buttonMode = true;
            }

        }
    }

    public move(x?: number, y?: number) {
        if (isNumeric(x)) {
            this.sprite.x = x;
        }

        if (isNumeric(y)) {
            this.sprite.y = y;
        }
    }

    public attachToContainer(container: Container) {
        container.addChild(this.sprite)
    }

    public removeFromParentContainer() {
        this.sprite.parent.removeChild(this.sprite);
    }

    protected addComponent<T extends ActorComponent>(type: ActorComponentType<T>): T {
        if (this.components[type.name]) {
            // for now only one instance of component type can exists
            console.warn(`WARNING: component of type ${type.name} already exists. It will be replaced`);
        }
        let component = new type(this);
        this.components[type.name] = component;

        return component;
    }

}


export interface IActorOptions {
    initialResourceKey?: string;
    interactive?: boolean;
}

