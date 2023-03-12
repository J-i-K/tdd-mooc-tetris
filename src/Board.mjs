export class Board {
  width;
  height;
  state;// = this.emptyBoard();
  boardTetrominoes;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    const boardArr = []
    for (let x = 0; x < this.height; x++) {
      const tempArray = []
      for (let y = 0; y < this.width; y++) {
        tempArray.push('.')
      }
      boardArr[x] = tempArray
    }
    this.state = boardArr
    this.boardTetrominoes = []
  }

  toString() {
    const out = []
    this.state.forEach(x => out.push(x.join('')))
    return out.join('\n').concat('\n');
  }

  hasFalling() {
    return this.boardTetrominoes.filter(tetromino => tetromino.isFalling === true).length === 0 ? false : true
  }

  // dropOld(block) {
  //   const tempState = this.state
  //   if (!this.blockIsFalling) {
  //     // console.log(block.shape.length)
  //     for (let row in block.shape) {
  //       for (let sqr in block.shape[row]) {
  //         const boardRow = tempState[row].split('')
  //         // console.log(this.width,Number(Math.floor(this.width / 2) - Number(sqr)), Number(sqr))//, Number(this.width % 2 + sqr))
  //         boardRow[Number(Math.floor(this.width / 2) - Number(sqr))] = block.shape[row][sqr]
  //         // console.log(boardRow)
  //         this.state[row] = boardRow.join('')
  //       }
  //     }
  //     // this.state[0] = `.${block.color}.`
  //     this.blockIsFalling = true;
  //   } else if (this.blockIsFalling) {
  //     throw new Error("already falling");
  //   }
  // }

  drop(tetromino) {
    if (!this.hasFalling()) {
      console.log('drop--')
      const blockList = []
      console.log(tetromino.shape)
      for (let x in tetromino.shape) {
        for (let y in tetromino.shape[x]) {
          if (tetromino.shape[x][y] !== '.') {
            blockList.push({'x':Number(x),'y': Number(Math.floor(this.width / 2) - Number(y))})
            console.log('blockList: ', blockList, 'tetromino shape: ', tetromino.shape[x][y])
            this.state[Number(x)][Number(Math.floor(this.width / 2) - Number(y))] = tetromino.shape[x][y]
            console.log(this.state)
          }
        }
      }
      let newTetromino = {'id':Number(this.boardTetrominoes.length), 'shapeStyle': tetromino.shapeStyle,'isFalling': true, 'blockList': blockList}
      this.boardTetrominoes.push(newTetromino)
      console.log('--drop')
    } else if (this.hasFalling()) {
      throw new Error("already falling");
    }
  }

  // drop(block) {
  //   let tempState = this.state
  //   console.log(this.state)
  //   for (let x in this.state) {
  //     for (let y in this.state[Number(x)]) {
  //       tempState[Number(x)][Number(y)] = this.state[Number(x)][Number(y)]
  //     }
  //   }
  //   console.log(tempState)
  //   // let tempState = this.state.splt('')
  //   if (!this.blockIsFalling) {
  //     for (let x in block.shape) {
  //       for (let y in block.shape[x]) {
  //         if (block.shape[Number(x)][Number(y)] !== '.') {
  //           // console.log(tempState[Number(x)][Number(Math.floor(this.width / 2) - Number(y))], block.shape[Number(x)][Number(y)])
  //           tempState[Number(x)][Number(Math.floor(this.width / 2) - Number(y))] = block.shape[Number(x)][Number(y)]
  //         }
  //         // this.state[Number(x)][Number(y)] = boardRow.join('')
  //       }
  //     }
  //     this.blockIsFalling = true;
  //     console.log(tempState, this.state)
  //   } else if (this.blockIsFalling) {
  //     throw new Error("already falling");
  //   }
  // }

  tick() {
      if (this.hasFalling()) {
        console.log('tick!')
        const fallingTetromino = this.boardTetrominoes.filter(tetromino => tetromino.isFalling === true)[0]
        // console.log(fallingTetromino)
        // console.log(fallingTetromino.blockList.filter(function(blockA,blockB) { return blockA.x < blockB.x && blockA.y === blockB.y ? blockB : blockA }))
        for (let block in fallingTetromino.blockList.filter(function(blockA,blockB) {
          return blockA.x < blockB.x && blockA.y === blockB.y ? blockB : blockA
        })) {
          console.log('get the ball rolling', fallingTetromino.blockList[block].x, this.height - 1)
          // console.log(this.state[0])
          if (fallingTetromino.blockList[block].x < this.height - 1) {// Not on bottom row
            console.log('not on bottom row, continuing')
            if (this.state[Number(fallingTetromino.blockList[block].x) + 1][Number(fallingTetromino.blockList[block].y)] === '.') {
              console.log('below is empty, hooray!')
              console.log('this is the below row before update', this.state[fallingTetromino.blockList[block].x + 1])
              this.state[Number(fallingTetromino.blockList[block].x) + 1][Number(fallingTetromino.blockList[block].y)] = fallingTetromino.shapeStyle
              this.state[Number(fallingTetromino.blockList[block].x)][Number(fallingTetromino.blockList[block].y)] = '.'
              console.log('this is the below row after update', this.state[fallingTetromino.blockList[block].x + 1])
              this.boardTetrominoes[fallingTetromino.id].blockList[block].x++
            } else { // Below is not empty so we must stop
              console.log('so we hit this else here')
              this.boardTetrominoes[fallingTetromino.id].isFalling = false
            }
          } else if (this.boardTetrominoes[fallingTetromino.id].blockList[block].x === this.height - 1) { // So this tetromino has reached the bottom
            this.boardTetrominoes[fallingTetromino.id].isFalling = false
          } else {
            console.log('did we end up in here instead?')
          }
        }
    }
  }

  // tick() {
  //   if (this.blockIsFalling = true) {
  //     const emptyRow = []
  //     for (let y = 0; y < this.width; y++) {
  //       emptyRow.push('.')
  //     }
  //     let workState = []
  //     for (let row = Number(this.state.length -1); row >= 0; row--) { // FOR EACH ROW, STARTING FROM BOTTOM
  //       console.log(row)
  //       if (this.state.slice(0, Number(row)).every(function isEmpty(x) {return x === emptyRow.join('')}) && this.state.slice(row).every(function isNotEmpty(x) {return x !== emptyRow.join('')})) {
  //         console.log('so', this.state.slice(0, row))
  //         console.log('this.state all above is empty and below is not, nothing to do')
  //         this.blockIsFalling = false
  //         workState[row] = this.state[row]
  //       } else if (this.state[row] === emptyRow.join('')) { // IF ROW IS EMPTY, COPY PREVIOUS ROW
  //         console.log('empty row')
  //         if (row !== 0) {
  //           console.log('other than row 0')
  //           workState[row] = this.state[Number(row - 1)] // COPY THE PREVIOUS ROW TO CURRENT
  //         } else {
  //           console.log('row 0')
  //           workState[row] = this.state[row]
  //         }
  //       } else if (this.state[row] !== emptyRow.join('')) {
  //         console.log('not empty row')
  //         if (row !== 0 && row !== Number(this.state.length - 1)) {
  //           console.log('other than row 0 or last row')
  //           workState[row] = this.state[Number(row - 1)] // COPY THE PREVIOUS ROW TO CURRENT
  //         } else if (row !== 0) {
  //           console.log('last row')
  //           workState[row] = this.state[row]
  //         } else {
  //           console.log('row 0')
  //           workState[row] = emptyRow.join('')
  //         }
  //       } else if (workState.slice(0, Number(row)).every(function isEmpty(x) {return x === emptyRow.join('')}) && workState.slice(row).every(function isNotEmpty(x) {return x !== emptyRow.join('')})) {
  //         console.log('workstate all above is empty and below is not')
  //       } else {
  //         console.log('hit else', this.state[row])
  //       }
  //     }
  //     console.log(workState)
  //     this.state = workState
  //   }
  // }
}