import matrix from './matrix';
import jsonToMat from './jsonToMat';
import getIndexes from './modelFuncs/getIndexes';
import initializeMat from './helpers/initializeMat';
import makeDiagMat from './helpers/makeDiagMat';
import predict from './modelFuncs/predict';
import convergenceCheck from './helpers/convergenceCheck';
import calcR2 from './modelFuncs/calcR2';
import residuals from './modelFuncs/residuals';
import coefStdErrs from './modelFuncs/coefStdErrs';
import coefTable from './modelFuncs/coefTable';
import genInverse from './genInverse';

const logistic = (x) => 1/(1 + Math.exp(-x))
const logit = (p) => Math.log(p/ (1 - p));

const calcB_new = (X, W, z) => {
  return X.t().mult(W).mult(X).inv().mult(X.t().mult(W).mult(z));
}

const calcP = (X, B_old) => {
  return predict(B_old, X)
    .map(yhat => logistic(yhat))
}

const calcW = (p) => {
  const diags = p.vals
    .map(prob => prob[0] / (1 - prob[0])); //convert to variance estimate using binomial var formula.
  return new matrix(makeDiagMat(diags));
}

const calcZ = (X,Y, B_old, W, p) => {
  return X.mult(B_old).add(
    W.inv().mult(Y.subtract(p))
  );
}

//recursive function to estimate coefficients using iteratively re-weighted least-squares.
const estCoefs = (config) => {
  //replace unsupplied values with defaults.
  const {X,Y,B_old,itNum,maxIts,thresh} = Object.assign(
    {
      B_old: new matrix(initializeMat(X.dim.cols, 1, 0)),
      itNum: 0,
      maxIts: 500,
      thresh: 0.001,
    }, config);

  const p = calcP(X, B_old);
  const W = calcW(p)
  const z = calcZ(X,Y, B_old, W, p)
  const B_new = calcB_new(X, W, z)
  const converged = convergenceCheck(B_old.col(0), B_new.col(0), thresh);
  if( converged || itNum >= maxIts){
    return {coefs: B_new, W}
  } else {
    return estCoefs(
      {
        X,
        Y,
        B_old: B_new,
        itNum: itNum + 1,
        maxIts,
        thresh
      })
  }
}


 /** Fits a Logist Regression Model using iteratively re-weighted least squares estimation. */
 class LRM{
  /**
   * @param {Object} config Object containing information for model fit.
   * @param {Object} config.data Data in json form keyed by predictor/outcome name.
   * @param {string} [config.outcome="y"] Name of the outcome variable you are predicting.
   * @param {string} [config.predictors=[]] Array of the names of the predictors used in model.
   * @param {boolean} [config.mle = false] Logical indicating if MLE should be used to model. (Defaults to least-squares.)
   * @returns {array} Json object containing eigenvalue and vectors.
  */
   constructor(
     config = {}
   ){
    const {
      data,
      outcome = "y",
      predictors = [],
      maxIter = 200,
      delta = 0.0001,
      threshold = 0.01,
    } = config;
    //convert data to a matrix object and extract column names.
    const {mat, colNames} = jsonToMat(data);
    const predIndexes = getIndexes(predictors, colNames);
    const outcomeIndex = getIndexes([outcome], colNames);
    const X = mat.select(predIndexes).addIntercept();
    const Y = mat.select(outcomeIndex)

    const {rows, cols} = mat.dim;

    const {coefs, W} = estCoefs(
      {
        X,
        Y,
        maxIts: maxIter,
        thresh:threshold
      }
    );

    this.coefs = coefs;
   }

  //  /**
  //   * Get new predictions from the fitted model
  //   * @param {matrix} X_new matrix object representing predictors of new data.
  //   * @returns {matrix} Column matrix representing the new predictions.
  //  */
  //  predict(X_new){
  //    return predict(this.coefs, X_new);
  //  }

 }


module.exports = LRM;
