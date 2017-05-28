const scaleMult = (c, mat) => {
  return mat.map(row => row.map(col => c*col))
}

module.exports = scaleMult;
