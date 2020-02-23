import { Actor } from "./Actor";

export interface IActorOptions {
    interactive?: boolean;
}

export interface ILoadResources {
    loadResources: () => Promise<unknown>,
    new (...args : any[]): Actor
}
