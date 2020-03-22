import {Level} from "../models/Level";
import {Balloon} from "../models/Balloon";
import {Cloud} from "../models/Cloud";
import {ResourceStore} from "../models/Resource-store";
import {Utils} from "../models/Utils";
import {Player} from "../models/player";

export class FirstLevel extends Level {

    private readonly balloonSpeed = 2;
    private readonly balloonLaunchInterval = 1500;
    private readonly cloudSpawnTopBorder = 0.01;
    private readonly cloudSpawnBottomBorder = 0.35;
    private readonly cloudLaunchInterval = 10000;
    private readonly cloudSpeed = 0.3;

    private player: Player;

    constructor() {
        super();
        this.player = new Player();
    }

    async init() {
        // TODO make load by array?
        await this.resourcesStore.loadResourcesOf(Cloud);
        await this.resourcesStore.loadResourcesOf(Balloon);
        await this.player.initCharacter();

        this.attachActor(this.player.character);
        this.player.character.move(...this.getPlayerSpawnPoint(this.player));
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

        if (balloon.y > 0 - balloon.height) {
            balloon.move(null, balloon.y - this.balloonSpeed * deltaTime);
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

        const balloon = new Balloon();

        balloon.on('pointerdown', () => {
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

    private getPlayerSpawnPoint(player: Player,) {
        const y = this.app.screen.height / 2;
        const x = this.app.screen.width / 2;

        return [x, y];
    }
}

