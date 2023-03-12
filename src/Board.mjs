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

  tick() {
    if (this.hasFalling()) {
      console.log('tick!')
      const fallingTetromino = this.boardTetrominoes.filter(tetromino => tetromino.isFalling === true)[0]
      let tetrominoCanMove = true
      for (let block in fallingTetromino.blockList) {
        if ( fallingTetromino.blockList.filter(listBlock => listBlock.x === Number(fallingTetromino.blockList[block].x + 1) && listBlock.y === Number(fallingTetromino.blockList[block].y)).length !== 0) {
          console.log('there is another block that is below this one from the same tetromino')
        } else if (fallingTetromino.blockList[block].x === this.height - 1 || // Bottom row, cannot move
        this.state[Number(fallingTetromino.blockList[block].x) + 1][Number(fallingTetromino.blockList[block].y)] !== '.') {// Not empty below, cannot move
          console.log('hit cannot move for block: ', fallingTetromino.blockList[block])
          tetrominoCanMove = false
        } else {
          console.log('else')
        }
      }
      if (tetrominoCanMove) {
        console.log('made it here?')
        // console.log(this.state)
        console.log(fallingTetromino.blockList.sort(function(a,b){return a.x - b.x}).reverse())
        fallingTetromino.blockList.sort(function(a,b){return a.x - b.x}).reverse().map(block => {
          this.state[Number(block.x)][Number(block.y)] = '.'
          block.x++
          this.state[Number(block.x)][Number(block.y)] = fallingTetromino.shapeStyle
        })
      } else {
        fallingTetromino.isFalling = false
      }
      // console.log('state after update', this.state)
    }
  }

  moveLeft() {
    if (this.hasFalling()) {
      console.log('movingLeft')
      const movingTetromino = this.boardTetrominoes.filter(tetromino => tetromino.isFalling === true)[0]
      let tetrominoCanMove = true
      for (let block in movingTetromino.blockList) {
        if (movingTetromino.blockList.filter(listBlock => listBlock.y === Number(movingTetromino.blockList[block].y - 1) && listBlock.x === Number(movingTetromino.blockList[block].x)).length !== 0) {
          console.log('there is another block that is below this one from the same tetromino')
        } else if (movingTetromino.blockList[block].y === 0 || // Left side, cannot move
        this.state[Number(movingTetromino.blockList[block].x)][Number(movingTetromino.blockList[block].y - 1)] !== '.') {// Not empty below, cannot move
          console.log('hit cannot move for block: ', movingTetromino.blockList[block])
          tetrominoCanMove = false
        } else {
          console.log('else')
        }
      }
      if (tetrominoCanMove) {
        console.log('made it here?')
        // console.log(this.state)
        console.log(movingTetromino.blockList.sort(function(a,b){return a.y - b.y}).reverse())
        movingTetromino.blockList.sort(function(a,b){return a.y - b.y}).map(block => {
          this.state[Number(block.x)][Number(block.y)] = '.'
          block.y--
          this.state[Number(block.x)][Number(block.y)] = movingTetromino.shapeStyle
        })
      }
      // else {
      //   movingTetromino.isFalling = false
      // }
      // console.log('state after update', this.state)
    }
  }

  moveRight() {
    if (this.hasFalling()) {
      console.log('movingLeft')
      const movingTetromino = this.boardTetrominoes.filter(tetromino => tetromino.isFalling === true)[0]
      let tetrominoCanMove = true
      for (let block in movingTetromino.blockList) {
        if (movingTetromino.blockList.filter(listBlock => listBlock.y === Number(movingTetromino.blockList[block].y + 1) && listBlock.x === Number(movingTetromino.blockList[block].x)).length !== 0) {
          console.log('there is another block that is below this one from the same tetromino')
        } else if (movingTetromino.blockList[block].y + 1 === 0 || // Left side, cannot move
        this.state[Number(movingTetromino.blockList[block].x)][Number(movingTetromino.blockList[block].y + 1)] !== '.') {// Not empty below, cannot move
          console.log('hit cannot move for block: ', movingTetromino.blockList[block])
          tetrominoCanMove = false
        } else {
          console.log('else')
        }
      }
      if (tetrominoCanMove) {
        console.log('made it here?')
        // console.log(this.state)
        console.log(movingTetromino.blockList.sort(function(a,b){return a.y - b.y}).reverse())
        movingTetromino.blockList.sort(function(a,b){return a.y - b.y}).reverse().map(block => {
          this.state[Number(block.x)][Number(block.y)] = '.'
          block.y++
          this.state[Number(block.x)][Number(block.y)] = movingTetromino.shapeStyle
        })
      }
      // else {
      //   fallingTetromino.isFalling = false
      // }
      // console.log('state after update', this.state)
    }
  }

  moveDown() {
    if (this.hasFalling()) {
      const fallingTetromino = this.boardTetrominoes.filter(tetromino => tetromino.isFalling === true)[0]
      let tetrominoCanMove = true
      for (let block in fallingTetromino.blockList) {
        if ( fallingTetromino.blockList.filter(listBlock => listBlock.x === Number(fallingTetromino.blockList[block].x + 1) && listBlock.y === Number(fallingTetromino.blockList[block].y)).length !== 0) {
          console.log('there is another block that is below this one from the same tetromino')
        } else if (fallingTetromino.blockList[block].x === this.height - 1 || // Bottom row, cannot move
        this.state[Number(fallingTetromino.blockList[block].x) + 1][Number(fallingTetromino.blockList[block].y)] !== '.') {// Not empty below, cannot move
          console.log('hit cannot move for block: ', fallingTetromino.blockList[block])
          tetrominoCanMove = false
        } else {
          console.log('else')
        }
      }
      if (tetrominoCanMove) {
        console.log('made it here?')
        console.log(this.state)
        console.log(fallingTetromino.blockList.sort(function(a,b){return a.x - b.x}).reverse())
        fallingTetromino.blockList.sort(function(a,b){return a.x - b.x}).reverse().map(block => {
          this.state[Number(block.x)][Number(block.y)] = '.'
          block.x++
          this.state[Number(block.x)][Number(block.y)] = fallingTetromino.shapeStyle
        })
      } else {
        fallingTetromino.isFalling = false
      }
      // console.log('state after update', this.state)
    }
  }
}