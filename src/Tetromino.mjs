export class Tetromino {
  shape;
  shapeStyle;
  orientation;
  uniqueOrientations;
  orientations = [];
  defaultShapes;
  
  constructor(shape, shapeStyle, orientation, uniqueOrientations) {
    this.shape = shape.split('\n')
    .map(string => string.trim())

    this.shapeStyle = shapeStyle

    this.orientation = Number(orientation)

    this.uniqueOrientations = Number(uniqueOrientations)

    this.defaultShapes = {
      'T': `.T.\nTTT\n...`,
      'I': `.....\n.....\nIIII.\n.....\n.....`,
      'O': `.OO\n.OO\n...`
    }

    this.orientations[0] = this.defaultShapes[this.shapeStyle]
    for (let z = 1; z < Number(this.uniqueOrientations); z++) {
      const origShape = this.orientations[Number(z - 1)].split('\n')
      let newShape = []
      for (let x in origShape) {
        const tempArray = []
        for (let y in origShape[x]) {
          tempArray.unshift(origShape[y][x])
        }
        newShape.push(tempArray.join(''))
      }
      this.orientations[z] = newShape.join('\n')
    }
  }

  static T_SHAPE = new Tetromino(`.T.\nTTT\n...`, 'T', 0, 4)
  static I_SHAPE = new Tetromino(`.....\n.....\nIIII.\n.....\n.....`, 'I', 0, 2)
  static O_SHAPE = new Tetromino(`.OO\n.OO\n...`, 'O', 0, 1)

  toString() {
    return this.shape.join('\n').concat('\n')
  }

  rotateRight() {
    return new Tetromino(this.orientations[
      this.orientation < Number(this.orientations.length - 1)
      ? this.orientation + 1
      : 0
    ],
    this.shapeStyle,
    this.orientation < Number(this.orientations.length - 1)
    ? this.orientation + 1
    : 0,
    this.uniqueOrientations)
  }

  rotateLeft() {
    return new Tetromino(this.orientations[
      this.orientation > 0
      ? this.orientation - 1
      : this.orientations.length - 1
    ],
    this.shapeStyle,
    this.orientation > 0
    ? this.orientation - 1
    : this.orientations.length - 1,
    this.uniqueOrientations)
  }
  // rotateRight() {
  //   const origShape = this.shape
  //   const newShape = []
  //   for (let x in origShape) {
  //     const tempArray = []
  //     for (let y in origShape[x]) {
  //       tempArray.unshift(origShape[y][x])
  //     }
  //     newShape.push(tempArray.join(''))
  //   }
  //   return new Tetromino(newShape.join('\n'))
  // }

  // rotateLeft() {
  //   const origShape = this.shape
  //   const newShape = []
  //   for (let x in origShape) {
  //     const tempArray = []
  //     for (let y in origShape[x]) {
  //       tempArray.push(origShape[y][x])
  //     }
  //     newShape.unshift(tempArray.join(''))
  //   }
  //   return new Tetromino(newShape.join('\n'))
  // }
}