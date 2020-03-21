import {ActorComponent} from "./actor-component";
import {Actor} from "../actor/Actor";

export class SoundComponent extends ActorComponent {

    private sounds: Record<string, Howl>;

    constructor(actor: Actor) {
        super(actor);
        this.sounds = {};
    }

    public attachSound(key: string, sound: Howl) {
        this.sounds[key] = sound;
        return this;
    }

    playSound(key: string) {
        let sound = this.sounds[key];

        if (sound) {
            sound.play();
        } else {
            console.warn(`sound ${key} does not exists`);
        }
    }
}
