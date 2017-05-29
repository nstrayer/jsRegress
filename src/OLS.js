// takes a json object and runs a simple ordinary least squares regression on it
// This returns an object with estimates of coefficienst, their standard errors, confidence intervals, etc.
import jsonToMat from './jsonToMat';
import matrix from './matrix';

class OLS{
  constructor(
    {
      data,
      outcome = "y",
      predictors = []
    }
  ){
    //convert data to a matrix object and extract column names.
    const {mat, colNames: names} = jsonToMat(data);
    this.mat = mat;
    this.names = names;

    const predIndexes = this.getIndexes(predictors);
    const outcomeIndex = this.getIndexes([outcome]);

    const X = mat
      .select(predIndexes)
      .addIntercept();

    const Y = mat
      .select(outcomeIndex)

    const coefs = this.calcCoefficients(X, Y)

    this.X = X;
    this.predictions = this.predictOutcome(coefs, X);
    this.residuals = this.calcResiduals(Y, this.predictions );
    this.RSS = this.calcRSS(this.residuals);
    this.sig2_hat = this.calcSig2_hat(this.RSS, X);
    this.cov = this.calcCov(X, this.sig2_hat);
    this.se = this.coefVars(this.cov);
    this.coefs_table = this.nameCoefficients(coefs.vals, predictors, this.se)

  }

  getIndexes(predictors){
    if(predictors.length === 0) {
      throw(new Error("Need to have some predictors to fit a regression."))
    }
    return predictors.map(name => this.names.indexOf(name))
  }

  calcCoefficients(X, Y){
    return X.t().mult(X).inv().mult(X.t()).mult(Y);
  }

  predictOutcome(coefs, X){
    return X.mult(coefs)
  }

  getDiff(a, b){
    return a.map((row, i) => [row[0] - b[i][0]])
  }

  calcResiduals(Y, predictions){
    return new matrix(this.getDiff(Y.vals, predictions.vals));
  }

  calcRSS(residuals){
    return residuals.t().mult(residuals).vals[0][0];
  }

  calcSig2_hat(rss, X){
    return rss / (X.dim.rows - X.dim.cols); //dont need to add one because X has intercept in it.
  }

  calcCov(X, sig2_hat){
    return X.t()
      .mult(X)
      .inv()
      .scaleMult(sig2_hat);
  }

  coefVars(cov){
    return cov.diag().map(v => Math.sqrt(v));
  }

  nameCoefficients(coefs, predictors, se){
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
}

module.exports = OLS;
