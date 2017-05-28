//simply adds a column of 1s to the data for modeling an intercept.

const appendColumn = (mat, value) => {
  return mat.map(row => [value, ...row]);
}

module.exports = appendColumn;
