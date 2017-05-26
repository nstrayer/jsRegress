//takes a json object and returns an object with
// a matrix object with the data inside of it
// The row names associated with the matrix.

import matrix from "./matrix";

const jsonToMat = (data) => {
  const matrixified = data.map(row => Object.values(row));

  return {
    mat: new matrix(matrixified),
    colNames: Object.keys(data[0])
  }
}

module.exports = jsonToMat;
