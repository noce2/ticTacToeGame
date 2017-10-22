"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ticTacToeGame_1 = require("./ticTacToeGame/ticTacToeGame");
function main() {
    const game = new ticTacToeGame_1.TicTacToeGame();
    game.welcomeMessage();
    game.initialisePlayers()
        .then(() => game.printGrid());
}
main();
