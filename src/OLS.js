// takes a json object and runs a simple ordinary least squares regression on it
// This returns an object with estimates of coefficienst, their standard errors, confidence intervals, etc.
import jsonToMat from './jsonToMat';

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
      .addIntercept()

    const Y = mat
      .select(outcomeIndex)

    const coefs = this.calcCoefficients(X, Y).vals
    this.coefs_table = this.nameCoefficients(coefs, predictors)
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

  nameCoefficients(coefs, predictors){
    return ["intercept", ...predictors]
      .map((pred, i) => ({name: pred, coefficient: coefs[i][0]}))
  }
}

module.exports = OLS;
