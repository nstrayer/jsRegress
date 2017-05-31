//takes the names of predictors, their coefficient estimates and std errors and returns a json table of the coefficients.
module.exports = (coefs, predictors, se) => {
  return ["intercept", ...predictors]
    .map((pred, i) => (
      {
        name: pred,
        coefficient: coefs[i][0],
        std_err: se[i],
        CI_lower: coefs[i][0] - 1.96*se[i],
        CI_upper: coefs[i][0] + 1.96*se[i]
      }))
}
