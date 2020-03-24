import {GameState} from "./Game-state";
//TODO make it singleton
export class UiLayer {

    private gameState: GameState;
    private pauseBtn: HTMLButtonElement;
    private scoreIndicator: HTMLSpanElement;
    private static _instance: UiLayer;
    private container: HTMLElement;

    static get instance() {
        if (!this._instance) {
            this._instance = new UiLayer();
        }

        return this._instance;
    }

    private constructor() {
        this.gameState = GameState.instance;
        this.initPauseBtn();
        this.initScoreIndicator();
        
    }

    public attachToContainer(container: HTMLElement) {
        this.container = container;
        this.container.appendChild(this.pauseBtn);
        this.container.appendChild(this.scoreIndicator);
    }


    private initPauseBtn() {
        this.pauseBtn = document.createElement('button');

        this.pauseBtn.className = 'pauseBtn';
        this.pauseBtn.style.cssText = 'position: fixed; top: 20px; right: 20px; font-size: 21px; padding: 5px 10px;';
        this.pauseBtn.addEventListener('click', (event) => this.togglePause());

        this.gameState.paused$.subscribe((paused) => {
            if (paused) {
                this.pauseBtn.innerText = 'resume';
            } else {
                this.pauseBtn.innerText = 'pause';
            }
        });
    }

    private initScoreIndicator() {
        this.scoreIndicator = document.createElement('span');

        this.scoreIndicator.style.cssText = 'position: fixed; top: 20px; left: 20px; font-size: 30px';

        this.gameState.score$.subscribe((score) => {
            this.scoreIndicator.innerText = score.toString();
        });

    }

    private togglePause() {
        if (this.gameState.paused) {
            this.resume()
        } else {
            this.pause();
        }
    }

    private pause() {
        this.gameState.paused = true;
    }

    private resume() {
        this.gameState.paused = false;
    }

    public appendChild(child: HTMLElement, options?: IAppendToUiOptions) {
        child.style.position = 'fixed';
        
        if (options && options.position) {

            for(let propKey in options.position) {
                child.style[propKey] = options.position[propKey];
            }
        }

        this.container.appendChild(child);
    }


}

export interface IAppendToUiOptions {
    position?: {
        top?: string,
        right?: string,
        bottom?: string,
        left?: string,
    }

}
