import {GameState} from "./game-state";

export class UiLayer {

    private gameState: GameState;
    private pauseBtn: HTMLButtonElement;
    private scoreIndicator: HTMLSpanElement;

    constructor(private container: HTMLElement) {
        this.gameState = GameState.instance;
        this.pauseBtn = document.createElement('button');
        this.scoreIndicator = document.createElement('span');
        this.init();

    }

    private init() {

        this.pauseBtn.className = 'pauseBtn';
        this.pauseBtn.style.cssText = 'position: fixed; top: 20px; right: 20px';
        this.pauseBtn.addEventListener('click', (event) => this.togglePause());

        this.scoreIndicator.style.cssText = 'position: fixed; top: 20px; left: 20px';

        this.gameState.paused$.subscribe((paused) => {
            if (paused) {
                this.pauseBtn.innerText = 'resume';
            } else {
                this.pauseBtn.innerText = 'pause';
            }
        });

        this.gameState.score$.subscribe((score) => {
            this.scoreIndicator.innerText = score.toString();
        });

        this.container.appendChild(this.pauseBtn);
        this.container.appendChild(this.scoreIndicator);
    }

    togglePause() {
        if (this.gameState.paused) {
            this.resume()
        } else {
            this.paused();
        }
    }

    paused() {
        this.gameState.paused = true;
    }

    resume() {
        this.gameState.paused = false;
    }






}
