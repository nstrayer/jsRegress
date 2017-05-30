const matrix = require('../dist/matrix.js');
const genInverse = require('../dist/genInverse.js');
const cholesky = require('../dist/cholesky.js')
const LM = require('../dist/LM.js');
const jsonToMat = require('../dist/jsonToMat');
const iden = require('../dist/iden.js');
const makeDiagMat = require('../dist/helpers/makeDiagMat.js');
const convergenceCheck = require('../dist/helpers/convergenceCheck.js');

const data = [
  {"x1":3.7839,"x2":6.5488,"y":25.9451},
  {"x1":-4.1419,"x2":6.621,"y":0.9537},
  {"x1":-2.6889,"x2":5.0663,"y":2.9919},
  {"x1":1.5944,"x2":5.3937,"y":16.181},
  {"x1":-1.5627,"x2":9.3721,"y":13.9982},
  {"x1":4.7038,"x2":9.2064,"y":33.6724},
  {"x1":-4.6978,"x2":5.3699,"y":-7.4255},
  {"x1":-2.0447,"x2":9.0999,"y":11.8831},
  {"x1":4.5843,"x2":5.8209,"y":23.8477},
  {"x1":2.2205,"x2":8.3515,"y":23.095}];

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
      console.log("converged in " + i + " iterations");
      break;
    }
  }
  // console.log(B_new);
}

class GLM{
  constructor(
    {
      data,
      outcome = "y",
      predictors = [],
      maxIter = 200,
      delta = 0.0001,
      threshold = 0.01,
    }
  ){
    //convert data to a matrix object and extract column names.
    const {mat, colNames} = jsonToMat(data);
    const predIndexes = this.getIndexes(predictors, colNames);
    const outcomeIndex = this.getIndexes([outcome], colNames);

    const X = mat.select(predIndexes).addIntercept();
    const Y = mat.select(outcomeIndex)
    const {rows, cols} = mat.dim;

    coefEst(X, Y, maxIter, delta,threshold)
  }

  getIndexes(predictors, colNames){
    if(predictors.length === 0) {
      throw(new Error("Need to have some predictors to fit a regression."))
    }
    return predictors.map(name => colNames.indexOf(name))
  }



}

new GLM(
  {
    data,
    outcome: "y",
    predictors: ["x1", "x2"]
  }
)
