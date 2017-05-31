//Given beta coefficients and a data matrix, will predict outcomes.

module.exports = (coefs, X) => X.mult(coefs);
