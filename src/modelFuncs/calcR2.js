//calculates R^2, or proportion of variation in data explained by model.
module.exports = (coefs, X, Y) => {
  const n = Y.dim.rows;
  const yAvg = Y.vals.reduce((sum, val) => sum + val[0], 0 )/n
  const top = coefs.t().mult(X.t()).mult(Y).el(0,0) - (n * (yAvg**2))
  const bottom = Y.t().mult(Y).el(0,0) - (n * (yAvg**2))
  return top/bottom
}
