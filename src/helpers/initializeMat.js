/**
 * Constructs a new empty matrix to be filled with a constant.
 * @param {number} rows Number of rows in the new matrix.
 * @param {number} [cols=rows] Number of columns in the new matrix.
 * @param {number} [filler=0] Value to fill all cells of matrix.
 * @returns {Array} New two dimensional array of the size requested.
 */
const initializeMat = (rows, cols = rows, filler = 0) => {
  return new Array(rows).fill(0).map(r => new Array(cols).fill(filler))
}

module.exports = initializeMat;
