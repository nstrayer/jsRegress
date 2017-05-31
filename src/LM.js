// takes a json object and runs a simple ordinary least squares regression on it
// This returns an object with estimates of coefficienst, their standard errors, confidence intervals, etc.
import jsonToMat from './jsonToMat';
import matrix from './matrix';
import calcR2 from './modelFuncs/calcR2';
import predict from './modelFuncs/predict';
import residuals from './modelFuncs/residuals';
import coefStdErrs from './modelFuncs/coefStdErrs';
import coefTable from './modelFuncs/coefTable';

/**
 * Fits a simple linear regression model to supplied data.
 * @param {object} data Data in json form keyed by predictor/outcome name.
 * @param {string} [outcome="y"] Name of the outcome variable you are predicting.
 * @param {string} [predictors=[]] Array of the names of the predictors used in model.
 * @param {boolean} [mle = false] Logical indicating if MLE should be used to model. (Defaults to least-squares.)
 * @returns {array} Json object containing eigenvalue and vectors.
 */
class LM{
  constructor(
    {
      data,
      outcome = "y",
      predictors = [],
      mle = false,
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
    this.Y = Y;
    this.coefs = coefs;
    this.predictions = predict(coefs, X);
    this.residuals = residuals(Y, this.predictions );
    this.RSS = this.calcRSS(this.residuals);
    this.sig2_hat = this.calcSig2_hat(this.RSS, X, mle);
    this.cov = this.calcCov(X, this.sig2_hat);
    this.se = coefStdErrs(this.cov);
    this.coefTable = coefTable(coefs.vals, predictors, this.se)
    this.R2 = calcR2(coefs, X, Y)
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

  predict(newX){
    return predict(this.coefs, newX)
  }

  calcRSS(residuals){
    return residuals.t().mult(residuals).vals[0][0];
  }

  calcSig2_hat(rss, X, mle){
    const divisor = mle? X.dim.rows: X.dim.rows - X.dim.cols;
    return rss / divisor; //dont need to add one because X has intercept in it.
  }

  calcCov(X, sig2_hat){
    return X.t()
      .mult(X)
      .inv()
      .scaleMult(sig2_hat);
  }


}

module.exports = LM;
