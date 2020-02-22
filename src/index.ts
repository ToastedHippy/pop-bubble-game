import {Game} from "./models/Game";
import {UiLayer} from "./models/ui-layer";

const appContainer = document.getElementById('pixiApp');
const uiLayerContainer = document.getElementById('uiLayer');

const game = new Game(appContainer);

game.run();

