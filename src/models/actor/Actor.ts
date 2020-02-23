import * as PIXI from "pixi.js";
import {IActorOptions} from "./actor.interface";
import Sprite = PIXI.Sprite;
import {Howl} from 'howler'

export abstract class Actor {
    protected static soundsUrls: Record<string, string>;
    protected static sounds: Record<string, Howl>;
    public readonly abstract sprite: Sprite;
    readonly key: string;

    protected constructor() {
        this.key = Math.random().toString(36).substr(2, 9);
    }

    public static async loadResources() {

        return new Promise((resolve, reject) => {
            if (this.soundsUrls) {

                this.sounds = {};

                for (const key in this.soundsUrls) {
                    this.sounds[key] = new Howl({
                        src: this.soundsUrls[key]
                    })

                    this.sounds[key].once('load', () => {
                        if (Object.values(this.sounds).every(s => s.state() === 'loaded')) {
                            resolve();
                        }
                    })

                    // this.sounds[key].once('loadError', () => reject(new Error('could not load sound')))
                }

            } else {
                resolve();
            }
        })
    }

    playSound(soundKey: string) {
        if (this.constructor['sounds'] && this.constructor['sounds'][soundKey]) {
            this.constructor['sounds'][soundKey].play();
        }
    }

    configure(options?: IActorOptions) {
        this.throwIfSpriteMissed();

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
        this.throwIfSpriteMissed();

        this.sprite.position.set(x, y);
    }

    private throwIfSpriteMissed() {
        if (!this.sprite) {
            throw new Error(`sprite does not exists on ${this.constructor.name}`);
        }
    }
}


