// tslint:disable:no-console
import * as readline from "readline";
import { User } from "../user/user";

/** model of TicTacToeGame */
export class TicTacToeGame {
    private maxNoOfMoves: 9;
    /** stores winning combos based on first number entered by player */
    private wins = {
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
    private player1: User;
    private player2: User;
    /** implements a process interface for querying the user and reading user inputs */
    private gameRL = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    /** prints welcome message */
    public welcomeMessage() {
        console.log("Welcome to Nsikan's Tic Tac Toe Game");
    }

    /** prints current grid status */
    public printGrid() {
        const moves: string[] = this.createGrid(this.player1, this.player2);
        return console.log(`
            ${moves[0] || 1} | ${moves[1] || 2} | ${moves[2] || 3} \n
            ${moves[3] || 4} | ${moves[4] || 5} | ${moves[5] || 6} \n
            ${moves[6] || 7} | ${moves[7] || 8} | ${moves[8] || 9} \n
        `);
    }

    /** Initialise players in the game */
    public initialisePlayers() {
        return this.sendQuestion("What Player do you want to be\? X or O\n",
            (answer) => {
                switch (answer) {
                    case "x":
                    case "o":
                    case "O":
                    case "X":
                        this.player1 = new User(answer.toUpperCase());
                        if (this.player1.characterType === "X") {
                            this.player2 = new User("O");
                        } else {
                            this.player2 = new User("X");
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
    /** returns boolean indicating whether grid is full or not */
    public isGridFull() {
        if (this.player1.noOfMoves + this.player2.noOfMoves < this.maxNoOfMoves) {
            return false;
        }
        return true;
    }

    /** returns boolean indicating whether a set of moves create a winning combo */
    public winningMoves(playerMoves: Set<number>) {
        let testResult: Array<Set<number>>;
        if (playerMoves.size > 1) {
            const firstMove = Array.from(playerMoves)[0];
            const possibleSubsets: Array<Set<number>> = this.wins[firstMove];
            // the below test
            testResult = possibleSubsets.filter((eachSet) => {
                for (let x of eachSet) {
                    if (!playerMoves.has(x)) {
                        return false;
                    }
                }
                return true;
            });
            if (testResult.length >= 1) {
                return true;
            }
            return false;
        }
        return false;
    }

    /** starts game and ends when there is a winner or full grid */
    public playGame() {
        // keep playing the game
        this.requestUserMove("player1")
        .then((answer) => this.player1.addUserMove(answer))
        .then(() => {
            if (!this.isGridFull() ||
            !this.winningMoves(this.player1.userMoves) ||
            !this.winningMoves(this.player2.userMoves)) {
                return null;
            } else {
                return this.gameOver();
            }
        })
        .then((answer) => this.requestUserMove("player2"))
        .then((answer) => this.player2.addUserMove(answer))
        .then(() => {
            if (!this.isGridFull() ||
            !this.winningMoves(this.player1.userMoves) ||
            !this.winningMoves(this.player2.userMoves)) {
                return null;
            } else {
                return this.gameOver();
            }
        })
        .then(() => this.playGame());

    }

    public gameOver() {
        if (this.winningMoves(this.player1.userMoves)){
            console.log(`${this.player1.characterType} is the winner`);
            process.exit(0);
        } else if (this.winningMoves(this.player2.userMoves)) {
            console.log(`${this.player2.characterType} is the winner`);
            process.exit(0);
        } else {
            console.log("the grid is full");
            this.printGrid();
            process.exit(0);
        }
    }
    /** requests the specific user move and returns a promise containing the value */
    private requestUserMove(playerName: string) {
        return this.sendQuestion(`${playerName}, please enter your move`, (answer) => {
            if ((/[1-9]/).test(answer) && answer.length === 1) {
                return Number(answer);
            } else {
                console.log(`${playerName}, please enter your move again.\
                \n It must be between 1 and 9.`);
                return this.requestUserMove(playerName);
            }
        });
    }
    /** generic factory for a question and response callback  */
    private sendQuestion(inputQuestion: string, filterLogic: (answer: string) => any) {
        // wrapping the readline interface and question method in a promise
        return this.promiseQuestion(inputQuestion).then(filterLogic);
    }

    /** converts Node readline callback-based question into a promise   */
    private promiseQuestion(inputQuestion: string) {
        return new Promise((resolve, reject) => {
            this.gameRL.question(inputQuestion, resolve);
        });
    }

    /** creates current grid */
    private createGrid(player1: User, player2: User) {
        const moves: string[] = [];
        for (const each of this.player1.showUserMoves()) {
            moves[each - 1] = this.player1.characterType;
        }
        for (const each of this.player2.showUserMoves()) {
            moves[each - 1] = this.player2.characterType;
        }
        return moves;
    }
}
