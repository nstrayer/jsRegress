//splices out a row from a dataset.

import cloneMat from './cloneMat';

const subsetMat = (mat, colNum) => {
  let newMat = cloneMat(mat);
  newMat.map(row => row.splice(colNum,1)); //remove the  column
  return newMat;
}

module.exports = subsetMat;
