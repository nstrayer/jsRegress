//makes a new empty matrix to be fild in with whatever you desire.
const initializeMat = (rows, cols = rows, filler = 0) => {
  return new Array(rows).fill(0).map(r => new Array(cols).fill(filler))
}

module.exports = initializeMat;
