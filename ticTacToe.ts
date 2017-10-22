// tslint:disable:no-console
import * as readline from "readline";
/** Class defining the user and their abilities */
class User {
   private userCharacterType: string;
   private storedUserMoves: Set<number>;
   constructor(characterType: string) {
       this.userCharacterType = characterType.toUpperCase();
       this.storedUserMoves = new Set();
   }

   get characterType(){
       return this.userCharacterType;
   }

    public showUserMoves() {
        return this.storedUserMoves.values();
    }
   /** stores the user move in their model and returns boolean to indicate success. */
    public addUserMove(input: string) {
        const previousSize = this.storedUserMoves.size;
        this.storedUserMoves.add(Number(input));
        if (this.storedUserMoves.size > previousSize) {
            return true;
        }
        return false;
    }

    get noOfMoves(){
        return this.storedUserMoves.size;
    }
}

// tslint:disable-next-line:max-classes-per-file
/** model of TicTacToeGame */
class TicTacToeGame {
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
        const moves: number[] = this.createGrid(this.player1, this.player2);
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

    /** generic factory for a question and response callback  */
    private sendQuestion(inputQuestion: string, filterLogic: (answer: string) => void) {
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
        let moves: number[] = [];
        for (let each of this.player1.showUserMoves()) {
            moves[each - 1] = each;
        }
        for (let each of this.player2.showUserMoves()) {
            moves[each - 1] = each;
        }
        return moves;
    }

    private fullGrid() {
        if (this.player1.noOfMoves + this.player2.noOfMoves < 9) {
            return false;
        }
        return true;
    }

    private winnerIs(player: User) {
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

