import {Level} from "../models/Level";
import {Balloon, BlueBalloon, GreenBalloon, RedBalloon, YellowBalloon} from "../models/Balloon";
import Ticker = PIXI.Ticker;

export class FirstLevel extends Level {

    private balloonsClasses = [
        RedBalloon,
        GreenBalloon,
        BlueBalloon,
        YellowBalloon
    ];
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
        await this.loadActorsTextures(this.balloonsClasses);

        this.createBalloon();
        setInterval(() => this.launchBalloon(), this.balloonInterval);
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

        const balloonClass = this.balloonsClasses[this.getRandomNumber(0, this.balloonsClasses.length - 1)];

        const balloon = this.createActor(balloonClass);
        balloon.sprite.on('pointerdown', () => this.removeActor(balloon));

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

