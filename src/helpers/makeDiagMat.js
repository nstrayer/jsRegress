//takes a vector of length n and returns an nxn matrix with vec on diagonals.
import initializeMat from './initializeMat';
import matrix from '../matrix';
const makeDiagMat = (vals) => {
  let D = initializeMat(vals.length)

  for(let i = 0; i < vals.length; i++) {
    D[i][i] = vals[i]
  }
  return D;
}

module.exports = makeDiagMat;
