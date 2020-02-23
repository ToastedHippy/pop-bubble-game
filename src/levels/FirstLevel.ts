import {Level} from "../models/Level";
import {Balloon} from "../models/Balloon";
import Ticker = PIXI.Ticker;

export class FirstLevel extends Level {

    private readonly balloonSpeed = 2;
    private readonly balloonInterval = 1500;

    constructor() {
        super();
    }

    protected render(deltaTime: number) {
        for (let actorKey in this.actors) {
            const actor = this.actors[actorKey];

            if (actor instanceof Balloon) {
                this.updateBalloon(actor, deltaTime)
            }
        }
    }

    async init() {
        await Balloon.loadResources();

        setInterval(() => {
            if (!this.gameState.paused){
                this.launchBalloon();
            }
        }, this.balloonInterval);
    }

    private updateBalloon(balloon: Balloon, deltaTime: number) {

        if (balloon.sprite.y > 0 - balloon.sprite.height ) {
            balloon.sprite.y = balloon.sprite.y - this.balloonSpeed * deltaTime;
        } else {
            this.removeActor(balloon);
        }
    }



    private launchBalloon() {
        let balloon = this.createBalloon();
        balloon.move(...this.getSpawnPoint(balloon));
    }

    private createBalloon() {

        const balloonColor = Balloon.colors[this.getRandomNumber(0, Balloon.colors.length - 1)];

        const balloon = new Balloon(balloonColor);

        balloon.sprite.on('pointerdown', () => {
            this.gameState.score++;
            this.removeActor(balloon);
        });

        this.attachActor(balloon);

        return balloon;
    }

    private getSpawnPoint(balloon: Balloon) {
        const halfOfBalloonW = balloon.sprite.width / 2;
        const balloonH = balloon.sprite.height;
        const viewW = this.app.screen.width;
        let rand = this.getRandomNumber(halfOfBalloonW, viewW - halfOfBalloonW);
        return [Math.floor(rand), this.app.screen.height + balloonH];
    }

    private getRandomNumber(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min))
    }
}

