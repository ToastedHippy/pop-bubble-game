import {Game} from "./models/Game";

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register(`service-worker.js`)
//             .then((reg) => {
//                 console.log('Service worker registered.', reg);
//             });
//     });
// }

const splashScreen = document.getElementById('splash-screen');
const appContainer = document.getElementById('pixiApp');
const game = new Game(appContainer);

game.run();

splashScreen.parentElement.removeChild(splashScreen);

