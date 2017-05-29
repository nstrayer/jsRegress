const OLS = require('../dist/OLS.js');
const matrix = require('../dist/matrix.js');
const qr = require('../dist/qr.js');


const A = new matrix(
  [
    [ 12, -51,   4],
    [  6, 167, -68],
    [ -4,  24, -41]
  ]
)


const eigen = (A, k = 50) => {
  let Ak = A.clone();

  for(let i = 0; i < k; i++){
    let {Q, R} = qr(Ak);
    Ak = R.mult(Q);
    console.log(Ak.diag())
  }
}

eigen(A)
