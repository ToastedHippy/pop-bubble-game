import { UiLayer } from "./Ui-layer";
import { GameState } from "./Game-state";

export class StreakCounter {

    private _streak: number;
    public get streak() { return this._streak; }

    public get streakIsFull() {
        return this._streak >= this.limit;
    }

    private uiLayer: UiLayer;
    private gameState: GameState;
    private element: HTMLElement;
    public readonly limit: number;
    public readonly baseValue: number;

    constructor(baseValue: number, limit: number) {
        this.uiLayer = UiLayer.instance;
        this.gameState = GameState.instance;
        this.limit = limit;
        this.baseValue = baseValue;
        this.initElement();
        this.resetStreak();
    }

    public increaseStreak() {
        this.updateStreak(this._streak + 1);
    }

    public resetStreak() {
        this.updateStreak(0);
    }

    private updateStreak(newValue: number) {
        this._streak = newValue;
        this.gameState.score += this._streak * this.baseValue;
        this.element.innerText = this._streak.toString();
    }

    private initElement() {
        this.element = document.createElement('div');
        this.element.style.fontSize = '50px';
        this.uiLayer.appendChild(this.element, {position: {left: '20px', top: 'calc(50% - 10px)'}});
    }

    public changeColor(color: string) {
        this.element.style.color = color;
    }
}