"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-console
const readline = require("readline");
/** Class defining the user and their abilities */
const user_1 = require("./user/user");
// tslint:disable-next-line:max-classes-per-file
/** model of TicTacToeGame */
class TicTacToeGame {
    constructor() {
        /** stores winning combos based on first number entered by player */
        this.wins = {
            1: [new Set([2, 3]), new Set([4, 7]), new Set([5, 9])],
            2: [new Set([5, 8]), new Set([1, 3])],
            3: [new Set([1, 2]), new Set([5, 7]), new Set([6, 9])],
            4: [new Set([1, 7]), new Set([5, 6])],
            5: [new Set([2, 8]), new Set([4, 6]), new Set([1, 9]), new Set([3, 7])],
            6: [new Set([3, 9]), new Set([4, 5])],
            7: [new Set([1, 4]), new Set([8, 9]), new Set([3, 5])],
            8: [new Set([2, 5]), new Set([7, 9])],
            9: [new Set([3, 6]), new Set([7, 8]), new Set([1, 5])],
        };
        /** implements a process interface for querying the user and reading user inputs */
        this.gameRL = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    /** prints welcome message */
    welcomeMessage() {
        console.log("Welcome to Nsikan's Tic Tac Toe Game");
    }
    /** prints current grid status */
    printGrid() {
        const moves = this.createGrid(this.player1, this.player2);
        return console.log(`
            ${moves[0] || 1} | ${moves[1] || 2} | ${moves[2] || 3} \n
            ${moves[3] || 4} | ${moves[4] || 5} | ${moves[5] || 6} \n
            ${moves[6] || 7} | ${moves[7] || 8} | ${moves[8] || 9} \n
        `);
    }
    /** Initialise players in the game */
    initialisePlayers() {
        return this.sendQuestion("What Player do you want to be\? X or O\n", (answer) => {
            switch (answer) {
                case "x":
                case "o":
                case "O":
                case "X":
                    this.player1 = new user_1.User(answer.toUpperCase());
                    if (this.player1.characterType === "X") {
                        this.player2 = new user_1.User("O");
                    }
                    else {
                        this.player2 = new user_1.User("X");
                    }
                    console.log(`Player 1 is ${this.player1.characterType}\
                        \nPlayer 2 (computer) is ${this.player2.characterType}\n
                        `);
                    break;
                default:
                    console.log("You've entered an invalid response, try again");
                    this.initialisePlayers();
            }
        });
    }
    /** generic factory for a question and response callback  */
    sendQuestion(inputQuestion, filterLogic) {
        // wrapping the readline interface and question method in a promise
        return this.promiseQuestion(inputQuestion).then(filterLogic);
    }
    /** converts Node readline callback-based question into a promise   */
    promiseQuestion(inputQuestion) {
        return new Promise((resolve, reject) => {
            this.gameRL.question(inputQuestion, resolve);
        });
    }
    /** creates current grid */
    createGrid(player1, player2) {
        let moves = [];
        for (let each of this.player1.showUserMoves()) {
            moves[each - 1] = each;
        }
        for (let each of this.player2.showUserMoves()) {
            moves[each - 1] = each;
        }
        return moves;
    }
    fullGrid() {
        if (this.player1.noOfMoves + this.player2.noOfMoves < 9) {
            return false;
        }
        return true;
    }
    winnerIs(player) {
        const firstMove = player.showUserMoves[0];
        const possibleSubsets = this.wins[firstMove];
        return null;
    }
}
function main() {
    const game = new TicTacToeGame();
    game.welcomeMessage();
    game.initialisePlayers()
        .then(() => game.printGrid());
}
main();
