import {PlayerCharacter} from "./player-character";
import {ResourceStore} from "../Resource-store";
import Container = PIXI.Container;
import {PlayerController} from "./player-controller";

export class Player {

    private resourceStore: ResourceStore;

    private _character: PlayerCharacter;
    public get character() { return this._character; }

    private controller: PlayerController;

    constructor() {
        this.resourceStore = ResourceStore.instance;
        this._character = null;
        this.controller = new PlayerController(this);
    }

    async initCharacter() {
        await this.resourceStore.loadResourcesOf(PlayerCharacter);
        this._character = new PlayerCharacter();
        this._character.scale(.2);
        this.controller.subscribeToPointerEvents();
    }
}
