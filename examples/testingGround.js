const matrix = require('../dist/matrix.js');
const genInverse = require('../dist/genInverse.js');
const cholesky = require('../dist/cholesky.js')
const LM = require('../dist/LM.js');
const jsonToMat = require('../dist/jsonToMat');
const iden = require('../dist/iden.js');

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

const abs = (mat) => {
  return new matrix( mat.vals.map(row => row.map(col => Math.abs(col))) );
}

const coefEst = (X, Y, W, B_old) => {

}

class GLM{
  constructor(
    {
      data,
      outcome = "y",
      predictors = [],
      maxIter = 1000,
    }
  ){
    //convert data to a matrix object and extract column names.
    const {mat, colNames} = jsonToMat(data);
    const predIndexes = this.getIndexes(predictors, colNames);
    const outcomeIndex = this.getIndexes([outcome], colNames);

    const X = mat.select(predIndexes).addIntercept();
    const Y = mat.select(outcomeIndex)
    const {rows, cols} = mat.dim;

    let W = iden(rows)
    let B_h = calcB_new(X, Y, W);
    let w_new = abs(Y.subtract(X.mult(B_h))).t()
    w_new.head()
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
