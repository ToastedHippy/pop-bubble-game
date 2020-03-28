import {Level} from "../models/Level";
import {Balloon} from "../models/Balloon";
import {Cloud} from "../models/Cloud";
import {ResourceStore} from "../models/Resource-store";
import {Utils} from "../models/Utils";
import { StreakCounter } from "../models/Streak-counter";

export class FirstLevel extends Level {

    private readonly balloonSpeed = 2;
    private readonly balloonLaunchInterval = 1000;
    private readonly cloudSpawnTopBorder = 0.01;
    private readonly cloudSpawnBottomBorder = 0.35;
    private readonly cloudLaunchInterval = 10000;
    private readonly cloudSpeed = 0.3;
    private readonly popScoreBase = 1;
    private readonly streakLimit = 5;
    private readonly availableBalloonColors: string[] = Balloon.availableColors;

    private balloonLaunchingQueue: string[];

    private streakBalloonColor: string;
    private streakCounter: StreakCounter;

    constructor() {
        super();
        this.balloonLaunchingQueue = [];
    }

    async init() {
        await this.resourcesStore.loadResourcesOf([Cloud, Balloon]);
        
        this.streakCounter = new StreakCounter(this.popScoreBase * 2, this.streakLimit);

        this.startLaunchingClouds();
        this.startLaunchingBalloons();

        this.changeStreak();
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

        if (balloon.y > 0 - balloon.height) {
            let speed = this.balloonSpeed;

            if (balloon.color === this.streakBalloonColor) {
                speed *= this.streakCounter.value + 1;
            }

            balloon.move(null, balloon.y - speed * deltaTime);
        } else {
            this.removeActor(balloon);
        }
    }

    private updateCloud(cloud: Cloud, deltaTime: number) {

        if (cloud.x > 0 - cloud.width) {
            cloud.move(cloud.x - this.cloudSpeed * deltaTime);
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

        const color = this.getBallonColor();
        const balloon = new Balloon(color);

        balloon.on('pointerdown', () => {
            if (balloon.color === this.streakBalloonColor) {
                this.updateStreak();
            } else {
                this.gameState.score += this.popScoreBase;
                this.streakCounter.resetStreak();
            }

            balloon.playSound('pop');
            balloon.playAnimation({
                onComplete: () => this.removeActor(balloon)
            });
        });

        this.attachActor(balloon);

        return balloon;

    }

    private getBallonColor() {
        
        if (!this.balloonLaunchingQueue.length) {
            this.balloonLaunchingQueue = Utils.shuffleArray(this.availableBalloonColors);
        }

        return this.balloonLaunchingQueue.pop();
    }

    private createCloud() {
        const cloud = new Cloud();
        this.attachActor(cloud);
        return cloud;
    }

    private getBalloonSpawnPoint(balloon: Balloon) {
        const halfOfBalloonW = balloon.width / 2;
        const balloonH = balloon.height;
        const viewW = this.app.screen.width;
        const rand = Utils.getRandomNumber(halfOfBalloonW, viewW - halfOfBalloonW);
        return [Math.floor(rand), this.app.screen.height + balloonH];
    }

    private getCloudSpawnPoint(cloud: Cloud, spawnInView: boolean = false) {
        const cloudW = cloud.width;
        const halfCloudH = cloud.height / 2;
        const topBorder = this.app.screen.height * this.cloudSpawnTopBorder;
        const bottomBorder = this.app.screen.height * this.cloudSpawnBottomBorder;
        const rightBorder = this.app.screen.width + cloudW + 50;

        const x = spawnInView
            ? Utils.getRandomNumber(0, rightBorder)
            : rightBorder;
        const y = Utils.getRandomNumber(topBorder + halfCloudH, bottomBorder - halfCloudH);

        return [x, y];
    }

    private updateStreak() {
        this.streakCounter.increaseStreak();
        
        if (this.streakCounter.streakIsFull) {
            this.changeStreak();
        }
    }

    private changeStreak() {
        this.streakCounter.resetStreak();
        this.streakBalloonColor =  Balloon.availableColors[Utils.getRandomNumber(0, Balloon.availableColors.length - 1)];

        this.streakCounter.changeColor(this.streakBalloonColor);
    }
}

