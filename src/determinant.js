//Takes the determinant a matrix object supplied.

//removes the row i and column j from the matrix and returns the new smaller one.
//removes the row i and column j from the matrix and returns the new smaller one.
const cofactor = (mat, i, j) => {
  let newMat = JSON.parse(JSON.stringify(mat))
  newMat.splice(i,1);                 //slice out the ith row
  newMat.map(row => row.splice(j,1)); //slice out the jth column
  return newMat;
}

const determinant = (mat) => {
  const rows = mat.length;
  const cols = mat[0].length;

  if(rows !== cols){
    throw new Error("Your matrix needs to be square to get a determinant")
  }

  if(rows === 2){
    return mat[0][0]*mat[1][1] - mat[1][0]*mat[0][1];
  } else {
    // scan across top row and sum determinants of the sub matrices
    let summed = 0
    for(let col_num = 0; col_num < rows; col_num++){
      summed += mat[0][col_num] * (1 - 2*(col_num%2)) * determinant(cofactor(mat, 0, col_num));
    }
    return summed;
  }
}

module.exports = determinant;
