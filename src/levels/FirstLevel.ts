import {Level} from "../models/Level";
import {Balloon, RedBalloon} from "../models/Balloon";
import {Cloud} from "../models/Cloud";

export class FirstLevel extends Level {

    private readonly balloonSpeed = 2;
    private readonly balloonLaunchInterval = 1500;
    private readonly cloudSpawnTopBorder = 0.01;
    private readonly cloudSpawnBottomBorder = 0.35;
    private readonly cloudLaunchInterval = 10000;
    private readonly cloudSpeed = 0.3;

    constructor() {
        super();
    }

    async init() {
        await RedBalloon.loadResources();
        await Cloud.loadResources();

        this.startLaunchingClouds();
        this.startLaunchingBalloons();
    }

    protected render(deltaTime: number) {
        for (let actorKey in this.actors) {
            const actor = this.actors[actorKey];

            if (actor instanceof Balloon) {
                this.updateBalloon(actor, deltaTime)
            } else if (actor instanceof Cloud) {
                this.updateCloud(actor, deltaTime)
            }

        }
    }

    private startLaunchingClouds() {
        for (let i = 0; i < 5; i++) {
            let cloud = this.createCloud();
            cloud.move(...this.getCloudSpawnPoint(cloud, true));
        }

        setInterval(() => {
            if (!this.gameState.paused) {
                let cloud = this.createCloud();
                cloud.move(...this.getCloudSpawnPoint(cloud));
            }
        }, this.cloudLaunchInterval);
    }

    private updateBalloon(balloon: Balloon, deltaTime: number) {

        if (balloon.sprite.y > 0 - balloon.sprite.height) {
            balloon.sprite.y = balloon.sprite.y - this.balloonSpeed * deltaTime;
        } else {
            this.removeActor(balloon);
        }
    }

    private updateCloud(cloud: Cloud, deltaTime: number) {

        if (cloud.sprite.x > 0 - cloud.sprite.width) {
            cloud.sprite.x = cloud.sprite.x - this.cloudSpeed * deltaTime;
        } else {
            this.removeActor(cloud);
        }
    }

    private startLaunchingBalloons() {
        setInterval(() => {
            if (!this.gameState.paused) {
                let balloon = this.createBalloon();
                balloon.move(...this.getBalloonSpawnPoint(balloon));
            }
        }, this.balloonLaunchInterval);

    }

    private createBalloon() {

        const balloon = new RedBalloon();

        balloon.sprite.on('pointerdown', () => {
            this.gameState.score++;
            balloon.playSound('pop');
            balloon.playAnimation({
                onComplete: () => this.removeActor(balloon)
            });
        });

        this.attachActor(balloon);

        return balloon;
    }

    private createCloud() {
        const shape = Cloud.shapes[this.getRandomNumber(0, Cloud.shapes.length - 1)];

        const cloud = new Cloud(shape);
        this.attachActor(cloud);
        return cloud;
    }

    private getBalloonSpawnPoint(balloon: Balloon) {
        const halfOfBalloonW = balloon.sprite.width / 2;
        const balloonH = balloon.sprite.height;
        const viewW = this.app.screen.width;
        const rand = this.getRandomNumber(halfOfBalloonW, viewW - halfOfBalloonW);
        return [Math.floor(rand), this.app.screen.height + balloonH];
    }

    private getCloudSpawnPoint(cloud: Cloud, spawnInView: boolean = false) {
        const cloudW = cloud.sprite.width;
        const halfCloudH = cloud.sprite.height / 2;
        const topBorder = this.app.screen.height * this.cloudSpawnTopBorder;
        const bottomBorder = this.app.screen.height * this.cloudSpawnBottomBorder;
        const rightBorder = this.app.screen.width + cloudW + 50;

        const x = spawnInView
            ? this.getRandomNumber(0, rightBorder)
            : rightBorder;
        const y = this.getRandomNumber(topBorder + halfCloudH, bottomBorder - halfCloudH);

        return [x, y];
    }

    private getRandomNumber(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min))
    }
}

