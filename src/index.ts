import {Game} from "./models/Game";

const appContainer = document.getElementById('pixiApp');
const game = new Game(appContainer);

game.run();
