//Multiplies two matrix objects supplied to it and returns a matrix object of result

import matrix from './matrix';

const matMult = (A,B) => {
  const A_rows = A.length;
  const A_cols = A[0].length;
  const B_rows = B.length
  const B_cols = B[0].length

  //make sure we can actually multiply these matricies
  if(A_cols !== B_rows){
    throw new Error("To multiply two matrices the number of columns of the first need to match the rows of the second. These don't match.")
  }

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
  return result;
}

module.exports = matMult;
