import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("start from the top middle", () => {
    board.drop(Tetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
    `....T.....
     ...TTT....
     ..........
     ..........
     ..........
     ..........`
    );
  });

  it("moves left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft()
    expect(board.toString()).to.equalShape(
    `...T......
     ..TTT.....
     ..........
     ..........
     ..........
     ..........`
    );
  });

  it("moves left and down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft()
    board.tick()
    expect(board.toString()).to.equalShape(
    `..........
     ...T......
     ..TTT.....
     ..........
     ..........
     ..........`
    );
  });

  it("moves right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight()
    expect(board.toString()).to.equalShape(
    `.....T....
     ....TTT...
     ..........
     ..........
     ..........
     ..........`
    );
  });

  it("moves right and down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight()
    board.tick()
    expect(board.toString()).to.equalShape(
    `..........
     .....T....
     ....TTT...
     ..........
     ..........
     ..........`
    );
  });

  it("moves down and down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown()
    board.tick()
    expect(board.toString()).to.equalShape(
    `..........
     ..........
     ....T.....
     ...TTT....
     ..........
     ..........`
    );
  });
});

describe("Sides stop movement", () => {
    let board;
    beforeEach(() => {
      board = new Board(10, 6);
    });
  
    it("start from the top middle", () => {
      board.drop(Tetromino.T_SHAPE);
  
      expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
      );
    });
  
    it("moves to left side", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveLeft()
      board.moveLeft()
      board.moveLeft()
      board.moveLeft()
      board.moveLeft()
      board.moveLeft()
      expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
      );
    });

    it("moves to left side and ticks down", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.tick()
        expect(board.toString()).to.equalShape(
        `..........
         .T........
         TTT.......
         ..........
         ..........
         ..........`
        );
      });
  
    it("moves to the left side and down", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveLeft()
      board.moveLeft()
      board.moveLeft()
      board.moveLeft()
      board.tick()
      board.tick()
      board.tick()
      board.tick()
      board.tick()
      board.tick()
      expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .T........
       TTT.......`
      );
    });
  
    it("moves to the right side", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.moveRight()
      expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
      );
    });

    it("moves to the right side and ticks down", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.tick()
        expect(board.toString()).to.equalShape(
        `..........
         ........T.
         .......TTT
         ..........
         ..........
         ..........`
        );
      });
  
    it("moves to the right side and down", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.moveRight()
      board.tick()
      board.tick()
      board.tick()
      board.tick()
      board.tick()
      board.tick()
      expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ........T.
       .......TTT`
      );
    });
  
    it("moves to the bottom", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveDown()
      board.moveDown()
      board.moveDown()
      board.moveDown()
      board.moveDown()
      expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
      );
    });

    it("moves to the bottom and is not falling", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()
        expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....T.....
         ...TTT....`
        );
        expect(
          board.hasFalling(),
          "the player should still be able to move the block"
        ).to.be.false;
      });
  });