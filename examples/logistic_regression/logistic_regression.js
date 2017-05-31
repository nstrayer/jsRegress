const d3 = require("d3");
const fs = require('fs');

const predict= require('../../dist/modelFuncs/predict');
const jsonToMat = require('../../dist/jsonToMat');
const IRWLS = require('../../dist/modelFuncs/IRWLS');
const getXY = require('../../dist/modelFuncs/getXY');
const genInverse = require('../../dist/genInverse')
const coefStdErrs = require('../../dist/modelFuncs/coefStdErrs');
const coefTable = require('../../dist/modelFuncs/coefTable');


const calcCov = (X, W) =>  X.t().mult(W).mult(X).inv()

class GLM{
  constructor(config = {}){
    const {
      data,
      familyFuncs,
      outcome = "y",
      predictors = [],
      maxIter = 50,
      threshold = 0.01,
    } = config;

    //extract the link functions from the family object.
    const { link, linkInv, linkInvPrime, variance } = familyFuncs;

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

    this.coefTable = coefTable(coefs.vals, predictors, stdErrs)
  }
}


//family information for the GLM
const binomialFamily = (() => {
  const link = (p) => Math.log(p/ (1 - p));
  const linkInv = (x) => 1/(1 + Math.exp(-x));
  const linkInvPrime = (x) => linkInv(x)*(1 - linkInv(x));
  const variance = (x) => x * (1 - x);

  return {
    link,
    linkInv,
    linkInvPrime,
    variance
  }
})()

const data = d3.csvParse(
 fs.readFileSync('./logisticData.csv', 'utf8')
);


const model = new GLM(
  {
    data: data,
    familyFuncs: binomialFamily,
    outcome: "y",
    predictors: ["x1", "x2"]
  }
)

console.log(model.coefTable)
