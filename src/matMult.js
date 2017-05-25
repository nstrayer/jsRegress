//Multiplies two matrix objects supplied to it.

const matMult = (matA,matB) => {
  //get the nice values out of the individual matrixes we're dealing with.
  const A = matA.vals;
  const B = matB.vals;
  //get dimensions for clearer for loops
  const {A_rows: rows, A_cols: cols} = matA.dims
  const {B_rows: rows, B_cols: cols} = matB.dims

  let result = [];

  for (let i = 0; i < A_rows; i++) {
      result[i] = [];
      for (var j = 0; j < B_cols; j++) {
          let sum = 0;
          for (let k = 0; k < A_cols; k++) {
              sum += A[i][k] * B[k][j];
          }
          result[i][j] = sum;
      }
  }
}

module.exports = matMult;
