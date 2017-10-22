/** Class defining the user and their abilities */
export class User {
    private userCharacterType: string;
    private storedUserMoves: Set<number>;
    constructor(characterType: string) {
        this.userCharacterType = characterType.toUpperCase();
        this.storedUserMoves = new Set();
    }

    /** returns whether user is X or O */
    get characterType(){
        return this.userCharacterType;
    }

    /** returns a set of user moves */
    get userMoves() {
        return this.storedUserMoves;
    }

    /** returns an iterablet of user moves */
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

    /** returns number of moves user has made */
    get noOfMoves(){
        return this.storedUserMoves.size;
    }
 }
