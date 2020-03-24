import { UiLayer } from "./Ui-layer";

export class StreakCounter {

    private _streak: number;
    private uiLayer: UiLayer;
    private element: HTMLElement;
    public readonly limit: number;

    constructor(limit: number) {
        this.uiLayer = UiLayer.instance;
        this.limit = limit;
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
        this.element.innerText = this._streak.toString();
    }

    private initElement() {
        this.element = document.createElement('div');
        this.uiLayer.appendChild(this.element, {position: {left: '0', top: '20px'}});
    }
}