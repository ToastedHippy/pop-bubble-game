import * as PIXI from "pixi.js";
import Application = PIXI.Application;
import Container = PIXI.Container;
import {FirstLevel} from "../levels/FirstLevel";
import {Level} from "./Level";

export class Game {

    private readonly pixiApp: Application;
    private readonly stage: Container;
    private activeLevel: Level;

    constructor(container: HTMLElement) {
        const containerH = container.clientHeight;
        const containerW = container.clientWidth;

        this.pixiApp = new Application({
            width: containerW,
            height: containerH,
            antialias: true,
            backgroundColor: 0x87CEEB
        });
        this.stage = this.pixiApp.stage;

        container.appendChild(this.pixiApp.view);
    }

    run() {
        this.startLevel(new FirstLevel());

    }

    startLevel(level: Level) {
        this.activeLevel = level;
        this.activeLevel.attachTo(this.pixiApp);

        try {
            this.activeLevel.run();
        } catch (e) {
            console.log(e)
        }
    }

    pause() {
        if (this.activeLevel) {
            this.activeLevel.pause();
        }
    }

    resume() {
        if (this.activeLevel) {
            this.activeLevel.resume();
        }
    }

}