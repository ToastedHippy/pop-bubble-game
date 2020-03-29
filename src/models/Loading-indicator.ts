import {UiLayer} from "./Ui-layer";

export class LoadingIndicator {
    private element: HTMLElement;
    private value: number;
    private uiLayer: UiLayer;

    constructor() {
        this.uiLayer = UiLayer.instance;
        this.initElement();
    }

    initElement() {
        this.element = document.createElement('div');
    }

    appendTo(container: HTMLElement) {
        container.appendChild(this.element);
    }

    updateValue(newValue:number) {
        this.value = newValue;
        this.element.innerText = `${this.value}%`;
    }
}
