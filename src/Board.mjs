export class Board {
  width;
  height;
  state;// = this.emptyBoard();
  blockIsFalling = false;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    const boardArr = []
    for (let x = 0; x < this.height; x++) {
      const tempArray = []
      for (let y = 0; y < this.width; y++) {
        tempArray.push('.')
      }
      boardArr[x] = tempArray.join('')
    }
    this.state = boardArr
  }

  toString() {
    return this.state.join('\n').concat('\n');
  }

  hasFalling() {
    return this.blockIsFalling;
  }

  drop(block) {
    const tempState = this.state
    if (!this.blockIsFalling) {
      // console.log(block.shape.length)
      for (let row in block.shape) {
        for (let sqr in block.shape[row]) {
          const boardRow = tempState[row].split('')
          // console.log(this.width,Number(Math.floor(this.width / 2) - Number(sqr)), Number(sqr))//, Number(this.width % 2 + sqr))
          boardRow[Number(Math.floor(this.width / 2) - Number(sqr))] = block.shape[row][sqr]
          // console.log(boardRow)
          this.state[row] = boardRow.join('')
        }
      }
      // this.state[0] = `.${block.color}.`
      this.blockIsFalling = true;
    } else if (this.blockIsFalling) {
      throw new Error("already falling");
    }
  }

  tick() {
    if (this.blockIsFalling = true) {
      const emptyRow = []
      for (let y = 0; y < this.width; y++) {
        emptyRow.push('.')
      }
      const workState = []
      for (let row = Number(this.state.length -1); row >= 0; row--) { // FOR EACH ROW, STARTING FROM BOTTOM
        console.log(row)
        if (this.state.slice(0, Number(row)).every(function isEmpty(x) {return x === emptyRow.join('')}) && this.state.slice(row).every(function isNotEmpty(x) {return x !== emptyRow.join('')})) {
          console.log('this.state all above is empty and below is not, nothing to do')
          this.blockIsFalling = false
          workState[row] = this.state[row]
        } else if (this.state[row] === emptyRow.join('')) { // IF ROW IS EMPTY, COPY PREVIOUS ROW
          console.log('empty row')
          if (row !== 0) {
            console.log('other than row 0')
            workState[row] = this.state[Number(row - 1)] // COPY THE PREVIOUS ROW TO CURRENT
          } else {
            console.log('row 0')
            workState[row] = this.state[row]
          }
        } else if (this.state[row] !== emptyRow.join('')) {
          console.log('not empty row')
          if (row !== 0 && row !== Number(this.state.length - 1)) {
            console.log('other than row 0 or last row')
            workState[row] = this.state[Number(row - 1)] // COPY THE PREVIOUS ROW TO CURRENT
          } else if (row !== 0) {
            console.log('last row')
            workState[row] = this.state[row]
          } else {
            console.log('row 0')
            workState[row] = emptyRow.join('')
          }
        } else if (workState.slice(0, Number(row)).every(function isEmpty(x) {return x === emptyRow.join('')}) && workState.slice(row).every(function isNotEmpty(x) {return x !== emptyRow.join('')})) {
          console.log('workstate all above is empty and below is not')
        } else {
          console.log('hit else', this.state[row])
        }
      }
      console.log(workState)
      this.state = workState
    }
  }
}