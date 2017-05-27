// Takes a matrix object and returns the
// lower cholesky decomposition.

const get_diag_val = (mat, L, k) => {
  let sum_val = 0;
  for(let j = 0; j < k; j++){ sum_val += Math.pow(L[k][j], 2) }
  return Math.sqrt(mat[k][k] - sum_val);
}

const get_col_val = (mat, L, i, k) => {
  let sum_val = 0;
  for(let j = 0; j < k; j++){ sum_val += L[i][j]*L[k][j] }
  return (1/L[k][k])*(mat[i][k] - sum_val);
}

const cholesky = (mat) => {
  const rows = mat.length;
  const cols = mat[0].length;
  let L = new Array(rows).fill(0).map(r => new Array(rows).fill(0))

  //catch error
  if(rows !== cols){
    throw new Error("Your matrix needs to be square to get a decomposition")
  }

  //step through the diagonal elements
  for(let k = 0; k < rows; k++){
    L[k][k] = get_diag_val(mat, L, k);
    for(let i = k + 1; i < rows; i++){
      L[i][k] = get_col_val(mat, L, i, k)
    }
  }
  return L;
}

module.exports = cholesky;
