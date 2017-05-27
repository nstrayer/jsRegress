//Takes the determinant a matrix object supplied.

import matrix from './matrix';

//removes the row i and column j from the matrix and returns the new smaller one.
//removes the row i and column j from the matrix and returns the new smaller one.
const cofactor = (mat, i, j) => {
  let newMat = JSON.parse(JSON.stringify(mat.vals))
  newMat.splice(i,1);                 //slice out the ith row
  newMat.map(row => row.splice(j,1)); //slice out the jth column
  return new matrix(newMat);
}

const det = (mat) => {
  if(!mat.isSymmetric()){
    throw new Error("Your matrix needs to be square to get a determinant")
  }

  const {rows, cols} = mat.dim;

  if(rows === 2){
    return mat.el(0,0)*mat.el(1,1) - mat.el(1,0)*mat.el(0,1);
  } else {
    // scan across top row and sum determinants of the sub matrices
    let summed = 0
    for(let col_num = 0; col_num < rows; col_num++){
      // console.log(mat.el(0,col_num))
      // console.table(cofactor(mat, 0, col_num).vals)
      summed += mat.el(0,col_num) * (1 - 2*(col_num%2)) * det(cofactor(mat, 0, col_num));
      // console.log(summed)
    }
    return summed;
  }
}

module.exports = det;
