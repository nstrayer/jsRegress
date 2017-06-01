// import matrix from './matrix';
// import iden from './iden';
// import makeDiagMat from './helpers/makeDiagMat';
// import convergenceCheck from './helpers/convergenceCheck';
// import calcR2 from './modelFuncs/calcR2';
// import residuals from './modelFuncs/residuals';
// import coefStdErrs from './modelFuncs/coefStdErrs';
//
import predict from './modelFuncs/predict';
import jsonToMat from './jsonToMat';
import IRWLS from './modelFuncs/IRWLS';
import getXY from './modelFuncs/getXY';
import genInverse from './genInverse';
import coefStdErrs from './modelFuncs/coefStdErrs';
import coefTable from './modelFuncs/coefTable';
import findFamily from './modelFuncs/findFamily';



const calcCov = (X, W) =>  X.t().mult(W).mult(X).inv()


 /** Fits a generalized least squares estimate using iteratively re-weighted least squares estimation. */
 class GLM{
   /**
    * @param {Object} config Object containing information for model fit.
    * @param {Object} config.data Data in json form keyed by predictor/outcome name.
    * @param {string} type Name of family you want to use. Currently just logistic is available.
    * @param {string} [config.outcome="y"] Name of the outcome variable you are predicting.
    * @param {string} [config.predictors=[]] Array of the names of the predictors used in model.
    * @param {Number} [maxIter = 50] Max number of itterations to try for convergence in iterative least squares algorithm
    * @param {Number} [threshold = 0.01] Limit of size of percent change in each parameter estimate that triggers the stop of iteration.
    * @returns {array} Json object containing eigenvalue and vectors.
   */
   constructor(config = {}){
     const {
       data,
       type,
       outcome = "y",
       predictors = [],
       maxIter = 50,
       threshold = 0.01,
     } = config;

     //extract the link functions from the family object.
     const { link, linkInv, linkInvPrime, variance } = findFamily(type);

     //extract data matrix and column names from JSON.
     const {mat, colNames} = jsonToMat(data);
     //grab predictor and response matrices out of data.
     const {X, Y} = getXY(predictors, outcome, mat, colNames)

     //calculate the coefficients using the IRWLS
     const {coefs, W} = IRWLS(
       {
         X,
         Y,
         linkInv,
         linkInvPrime,
         variance,
         maxIts: maxIter,
         thresh:threshold
       }
     );
     const cov = calcCov(X, W);
     const stdErrs = coefStdErrs(cov);
     console.log(cov)
     this.cov = cov;
     this.coefTable = coefTable(coefs.vals, predictors, stdErrs)
   }
 }

module.exports = GLM;
