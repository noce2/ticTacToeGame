"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Class defining the user and their abilities */
class User {
    constructor(characterType) {
        this.userCharacterType = characterType.toUpperCase();
        this.storedUserMoves = new Set();
    }
    /** returns whether user is X or O */
    get characterType() {
        return this.userCharacterType;
    }
    /** returns a set of user moves */
    get userMoves() {
        return this.storedUserMoves;
    }
    /** returns an iterablet of user moves */
    showUserMoves() {
        return this.storedUserMoves.values();
    }
    /** stores the user move in their model and returns boolean to indicate success. */
    addUserMove(input) {
        const previousSize = this.storedUserMoves.size;
        this.storedUserMoves.add(Number(input));
        if (this.storedUserMoves.size > previousSize) {
            return true;
        }
        return false;
    }
    /** returns number of moves user has made */
    get noOfMoves() {
        return this.storedUserMoves.size;
    }
}
exports.User = User;
