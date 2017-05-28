//returns first R rows and C cols of matrix. Defaults to 10, 10.

const head = (mat, numRows, numCols) => {
  const smaller = mat.filter((row, rowNum) => rowNum < numRows)
   .map(row => row.filter((col, colNum) => colNum < numCols ))
  console.log(smaller);
}

module.exports = head;
