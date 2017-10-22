import { TicTacToeGame } from "./ticTacToeGame/ticTacToeGame";
import { User } from "./user/user";

function main() {
    const game = new TicTacToeGame();
    game.welcomeMessage();
    game.initialisePlayers()
    .then(() => game.printGrid());
}

main();
