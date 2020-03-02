import * as PIXI from "pixi.js";
import Texture = PIXI.Texture;
import {Howl} from "howler";
import Loader = PIXI.Loader;

export class ResourceStore {
    private static _instance: ResourceStore;

    public readonly resources: {[K in keyof ResourcesState]: ResourcesState[K]};
    private readonly resourcesDefinitions: Map<Function, ResourcesDefinition>;
    private readonly LOADER_KEY_SEPARATOR = '|';

    private constructor() {
        this.resources = {
            animations: {},
            textures: {},
            sounds: {}
        };
        this.resourcesDefinitions = new Map<Function, ResourcesDefinition>();
    }

    public static get instance() {
        if (!this._instance) {
            this._instance = new ResourceStore();
        }

        return this._instance;
    }

    async loadResourcesOf(cls: Function) {
        // TODO handle case when resource is already loaded

        let resDefs = this.resourcesDefinitions.get(cls);
        let soundP = resDefs.sounds
            ? new Promise<void>((sResolve, sReject) => {
                for (let key in resDefs.sounds) {
                    this.resources.sounds[key] = new Howl({
                        src: resDefs.sounds[key]
                    });

                    this.resources.sounds[key].once('load', () => {
                        if (Object.values(this.resources.sounds).every(s => s.state() === 'loaded')) {
                            sResolve();
                        }
                    })

                }
            })
            : Promise.resolve();

        let otherResP = new Promise((resolve, reject) => {
            const loader = new Loader();
            let resType: keyof ResourcesState;

            for (resType in resDefs) {
                if (resType === 'sounds') {
                    continue;
                }

                for (let key in resDefs[resType]) {
                    let loaderKey = [resType, key].join(this.LOADER_KEY_SEPARATOR);
                    loader.add(loaderKey, resDefs[resType][key]);
                }
            }

            loader.load((loader, resources) => {

                for (const loaderKey in resources) {
                    let loaderKeyParts = loaderKey.split(this.LOADER_KEY_SEPARATOR);
                    let resType = loaderKeyParts[0];
                    let key = loaderKeyParts[1];

                    switch (resType as keyof ResourcesState) {
                        case "textures":
                            if (resources[loaderKey].texture) {
                                this.resources.textures[key] = resources[loaderKey].texture;
                            }
                            break;
                        case "animations":
                            if (resources[loaderKey].textures) {
                                this.resources.animations[key] = Object.values(resources[loaderKey].textures);
                            }
                            break;
                        default:
                            break;
                    }
                }

                resolve();
            });

            loader.on('error', error => reject(error))
        });

        return Promise.all([soundP, otherResP]);
    }

    defineResource(cls: Function, resourcesDefinition: ResourcesDefinition) {
        this.resourcesDefinitions.set(cls, resourcesDefinition)
    }
}

export interface ResourcesState {
    textures: Record<string, Texture>,
    sounds: Record<string, Howl>,
    animations: Record<string, Texture[]>
}

export type ResourcesDefinition = {
    [K in keyof Partial<ResourcesState>]: {[K: string]: string};
}

export interface IResourceDefinition {
}
