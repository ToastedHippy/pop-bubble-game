import {LoadingIndicator} from "./Loading-indicator";
import {UiLayer} from "./Ui-layer";

export class LoadingScreen {
    private loadingIndicator: LoadingIndicator;
    private element: HTMLElement;
    private uiLayer: UiLayer;

    constructor() {
        this.uiLayer = UiLayer.instance;
        this.initElement();
        this.loadingIndicator = new LoadingIndicator();
        this.loadingIndicator.appendTo(this.element);
        this.hide();
    }

    private initElement() {
        this.element = document.createElement('div');
        this.element.style.cssText = 'top: 0; height: 100vh; width: 100vw; align-items: center; justify-content: center;';
        this.uiLayer.appendChild(this.element);
    }

    updateIndicator(newValue: number) {
        this.loadingIndicator.updateValue(newValue);
    }

    show() {
        this.element.style.display = 'flex';
    }

    hide() {
        this.element.style.display = 'none'
    }
}
