export class Board {
  width;
  height;
  state = this.emptyBoard();
  blockIsFalling = false;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  emptyBoard() {
    return ["...", "...", "..."];
  }

  toString() {
    return this.state.join('\n').concat('\n');
  }

  hasFalling() {
    return this.blockIsFalling;
  }

  drop(block) {
    if (!this.blockIsFalling) {
      this.state[0] = `.${block.color}.`
      this.blockIsFalling = true;
    } else if (this.blockIsFalling) {
      throw new Error("already falling");
    }
  }

  tick() {
    let startState = this.state
    // console.log('state at start: ', this.state)
    if (this.blockIsFalling = true) {
      // console.log('falling')
      if (startState[2] === '...') {
        // console.log('no blocks on last row')
        this.state[2] = startState[1]
        this.state[1] = startState[0]
        this.state[0] = '...'
      } else if (startState[1] === '...') {
        // console.log('no blocks on middle row')
        if (startState[0] === '...') {
          // console.log('nothing to do')
          this.blockIsFalling = false
        } else {
          this.state[1] = startState[0]
          this.state[0] = '...'
        }
      }
      else if (startState[0] === '...' && (startState[1] !== '...' || startState[2] !== '...')) {
        // console.log('no new blocks and nothing to move')
        this.blockIsFalling = false
      }
      else if (startState === this.state) {
        // console.log('no changes')
        this.blockIsFalling = false
      }
      else {
        // console.log('so no blocks are moving')
        this.blockIsFalling = false
      }
      // console.log('state at end: ', this.state, ' and a block is moving?', this.blockIsFalling)
    }
  }
}