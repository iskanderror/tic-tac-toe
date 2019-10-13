
/* assume some conditions:
    - field 3*3
    - numeration starts by 0
    - x are first
*/

const FIELD_SIZE = 3;
const MAX_TURN_COUNT = FIELD_SIZE * FIELD_SIZE;
const PLAYER_1_SIGN = 'x';
const PLAYER_2_SIGN = 'o';
class TicTacToe {
    constructor() {
      this._turnCount = 0;
      this._data = [];
      for (let i=0;i<FIELD_SIZE;i++) {
        this._data.push(new Array(FIELD_SIZE).fill(null));
      }
      this._winner = null;
    }
    
    
    getCurrentPlayerSymbol() {
      if ( (this._turnCount%2) == 0) {
        return PLAYER_1_SIGN;
      }
      return PLAYER_2_SIGN;
    }

    nextTurn(rowIndex, columnIndex) {
      if (this._data[rowIndex][columnIndex] !== null){
        return;
      }
      let currentSymbol = this.getCurrentPlayerSymbol();
      this._data[rowIndex][columnIndex] = currentSymbol;

      /*check rows and cols*/
      let symbolsInRow = 0;
      let symbolsInCol = 0;
      for (let i=0; i<FIELD_SIZE; i++){
        if(this._data[rowIndex][i] === currentSymbol) {
          symbolsInRow++;
        }
        if(this._data[i][columnIndex] === currentSymbol) {
          symbolsInCol++;
        }
      }

      /*check diagonals*/
      let symbolsInDiag1 = 0;
      let symbolsInDiag2 = 0;
      if (rowIndex===columnIndex || rowIndex===FIELD_SIZE-1-columnIndex) {
        for (let i=0; i<FIELD_SIZE; i++) {
          if(this._data[i][i] === currentSymbol){
            symbolsInDiag1++;
          }
          if(this._data[i][FIELD_SIZE-1-i] === currentSymbol){
            symbolsInDiag2++;
          }
        }
      }

      if ( (symbolsInRow == FIELD_SIZE) || (symbolsInCol==FIELD_SIZE) || 
      (symbolsInDiag1==FIELD_SIZE) || (symbolsInDiag2==FIELD_SIZE)) {
        this._winner = currentSymbol;
      }

      this._turnCount++;
    }

    isFinished() {
      if (this.isDraw() || this.getWinner() !== null){
        return true;
      }
      return false;
    }

    getWinner() {
      return this._winner;
    }

    noMoreTurns() {
      return (this._turnCount >= MAX_TURN_COUNT);
    }

    isDraw() {
      if ( ! this.noMoreTurns() || this.getWinner() !== null){
        return false;
      }
      return true;
    }

    getFieldValue(rowIndex, colIndex) {
      return this._data[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;