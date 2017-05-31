//takes covariance matrix and returns a vector of the standard errors. I.e. the square roots of the diagonals.

module.exports = (cov) => cov.diag().map(v => Math.sqrt(v));
