import {Actor} from "../actor/Actor";

export class ActorComponent {

    public readonly actor: Actor;

    constructor(actor: Actor) {
        this.actor = actor;
    }
}

export type ActorComponentType<T extends ActorComponent> = {
    new(actor: Actor): T;
}
