export class Board {
  width;
  height;
  state;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  state = "...\n...\n...\n";

  toString() {
    return this.state;
  }

  drop(block) {
    this.state = ".X.\n...\n...\n";
  }
}