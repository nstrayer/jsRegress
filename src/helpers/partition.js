const range = (end, start = 0) => {
  const len = (end+1) - start;
  return [...Array(len)].map((el, i) => i + start);
}

const partition = (mat, rowRange, colRange) => {
  const rowIndexes = range(rowRange[1], rowRange[0]);
  const colIndexes = range(colRange[1], colRange[0]);

  return mat.filter((el, i) => rowIndexes.includes(i))
    .map(row => row.filter((el, j) => colIndexes.includes(j)))
}

module.exports = partition;
