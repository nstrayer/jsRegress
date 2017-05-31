import jsonToMat from './jsonToMat';
import matrix from './matrix';
import genInverse from './genInverse';
import iden from './iden';
import makeDiagMat from './helpers/makeDiagMat';
import convergenceCheck from './helpers/convergenceCheck';
import calcR2 from './modelFuncs/calcR2';
import predict from './modelFuncs/predict';
import residuals from './modelFuncs/residuals';
import coefStdErrs from './modelFuncs/coefStdErrs';
import coefTable from './modelFuncs/coefTable';

 const calcB_new = (X, Y, W) => {
   return X.t().mult(W).mult(X).inv().mult(X.t().mult(W).mult(Y));
 }

 const abs = (mat) => mat.map(el => Math.abs(el))

 const max = (A,c) => A.map((el, i, j) => Math.max(A.el(i,j), c))

 const coefEst = (X, Y, maxIter, delta, threshold) => {
   let W = iden(X.dim.rows) //start with identity matrix for weights. I.e unweighted regression.
   // console.log(Y.col(0))
   let B = calcB_new(X, Y, W); //calculate initial beta hat estimates.
   let B_old;
   let w;
   let converged;

   for(let i = 0; i < maxIter; i++){
     B_old = B;
     w = max( //calculate a new Weight matrix using last beta hat.
       abs(Y.subtract(X.mult(B))).t(),
       delta
     )
     W = new matrix(makeDiagMat(w.vals[0].map(el => 1/el)))
     B = calcB_new(X, Y, W)

     converged = convergenceCheck(B.col(0), B_old.col(0));

     if(converged) {
       break;
     }
   }
   return {
     coefs: B,
     W
   }
 }

 const calcCov = (X, W) => {
   const Sigma_inv = W.inv();
   const gen_inv_chunk = genInverse(X.t().mult(Sigma_inv).mult(X));
   const middle = X.t().mult(Sigma_inv).mult(X);
   return gen_inv_chunk.mult(middle).mult(gen_inv_chunk);
 }

 const getIndexes = (predictors, colNames) => {
   if(predictors.length === 0) {
     throw(new Error("Need to have some predictors to fit a regression."))
   }
   return predictors.map(name => colNames.indexOf(name))
 }

 /** Fits a generalized least squares estimate using iteratively re-weighted least squares estimation. */
 class GLM{
  /**
   * @param {Object} config Object containing information for model fit.
   * @param {object} config.data Data in json form keyed by predictor/outcome name.
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

    const {coefs, W} = coefEst(X, Y, maxIter, delta,threshold)
    const R2 = calcR2(coefs, X, Y)
    const cov = calcCov(X, W);
    const stdErrs = coefStdErrs(cov);

    //export values for user to pull off at their desire.
    // this.R2 = R2;
    this.coefs = coefs;
    this.coefTable = coefTable(coefs.vals, predictors, stdErrs)
    this.cov = cov;
    this.predictions = predict(coefs, X);
    this.residuals = residuals(Y, this.predictions);
   }

   /**
    * Get new predictions from the fitted model
    * @param {matrix} X_new matrix object representing predictors of new data.
    * @returns {matrix} Column matrix representing the new predictions.
   */
   predict(X_new){
     return predict(this.coefs, X_new);
   }

 }


module.exports = GLM;
