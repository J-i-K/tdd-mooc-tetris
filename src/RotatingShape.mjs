export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape.split('\n')
    .map(string => string.trim())
  }

  rotateRight() {
    const origShape = this.shape
    const newShape = []
    for (let x in origShape) {
      const tempArray = []
      for (let y in origShape[x]) {
        tempArray.unshift(origShape[y][x])
      }
      newShape.push(tempArray.join(''))
    }
    return newShape.join('\n').concat('\n')
  }

  rotateLeft() {
    const origShape = this.shape
    const newShape = []
    for (let x in origShape) {
      const tempArray = []
      for (let y in origShape[x]) {
        tempArray.push(origShape[y][x])
      }
      newShape.unshift(tempArray.join(''))
    }
    return newShape.join('\n').concat('\n')
  }

  toString() {
    return this.shape.join('\n').concat('\n')
  }

  // arrayRotate(arr, direction) {
  //   const unrotatedArray = arr
  //   const newArray = []
  //   console.log('array is array?', Array.isArray(unrotatedArray), 'array looks like: ', unrotatedArray)
  //   if (direction === 'left') {
  //     unrotatedArray.unshift(unrotatedArray.pop())
  //     console.log(unrotatedArray)
  //   }
  //   if (direction === 'right') {
  //     // console.log(arr)
  //     unrotatedArray.push(unrotatedArray.shift())
  //     // console.log(typeof arr)
  //   }
  //   console.log('array is array?', Array.isArray(unrotatedArray), 'array looks like: ', unrotatedArray)
  //   return unrotatedArray;
  //   }
}