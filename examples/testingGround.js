const OLS = require('../dist/OLS.js');
const matrix = require('../dist/matrix.js');
const qr = require('../dist/qr.js');
const eucNorm = require('../dist/eucNorm.js');
const iden = require('../dist/iden.js');

const normalize = (vec) => {
  const length = eucNorm(vec);
  return vec.map(el => el/length);
}

const stopCriteria = (oldVals, newVals, thresh) => oldVals
  .map((v, i) => Math.abs((v - newVals[i])/v) > thresh)
  .reduce((sum,el)=> el? sum + 1: sum, 0) === 0

//For convergence we look at each eigenvalue and track it's percent
//change from the last itteration. We will stop the itteration
//when every eigenvalue has stopped shifting by more than the threshold percentage.
const eigenVecs = (A, k = 50, threshold = 0.0000001) => {
  let Ak = A.clone();
  let pQ = iden(A.dim.rows);
  let eigenVals = Array(A.dim.rows).fill(1);
  let newEigenVals = Array(A.dim.rows).fill(1000);
  let qrd;

  while(!stopCriteria(eigenVals, newEigenVals, threshold)){
    eigenVals = newEigenVals;
    qrd = qr(Ak);
    pQ = pQ.mult(qrd.Q);
    Ak = qrd.R.mult(qrd.Q);
    newEigenVals = Ak.diag();
  }
  return eigenVals.map((eig_val, i) => (
    {
      value: eig_val,
      vector: normalize(pQ.col(i))
    }
  ))
}


const A = new matrix(
  [
    [ 12, -51,   4],
    [  6, 167, -68],
    [ -4,  24, -41]
  ]
)


console.log(eigenVecs(A))
