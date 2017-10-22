var assert = require('assert');
const TicTacToeGame = require('../ticTacToeGame/ticTacToeGame').TicTacToeGame;
const testGame = new TicTacToeGame();

describe('Tic Tac Toe Game ', function() {
  describe('#winningMoves()', function() {
    it('should return false when no values are entered', function() {
      assert.equal(false, testGame.winningMoves(new Set([])));
    });
    it('should return true when the users moves are 1, 2, 3', function() {
        assert.equal(true, testGame.winningMoves(new Set([1,2,3])));
    });
    it('should return true when the users moves are 1, 5, 7, 9', function() {
        assert.equal(true, testGame.winningMoves(new Set([1,5,7,9])));
    });
    it('should return false when the users moves are 1, 5, 6', function() {
        assert.equal(false, testGame.winningMoves(new Set([1,5,6])));
    });
  });
});