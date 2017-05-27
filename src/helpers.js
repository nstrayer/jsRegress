//small functions I find myself reusing a lot so putting them here.

//makes a new empty matrix to be fild in with whatever you desire.
const initializeMat = (rows, cols = rows, filler = 0) => {
  return  new Array(rows).fill(0).map(r => new Array(cols).fill(filler))
}

const makeDiagMat = (vals) => {
  let D = initializeMat(vals.length)

  for(let i = 0; i < vals.length; i++) {
    D[i][i] = vals[i]
  }
  return D;
}
