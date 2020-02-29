import {Game} from "./models/Game";
import {CONFIG} from "./config";


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(`service-worker.js`)
            .then((reg) => {
                console.log('Service worker registered.', reg);
            });
    });
}

const appContainer = document.getElementById('pixiApp');
const game = new Game(appContainer);

game.run();
