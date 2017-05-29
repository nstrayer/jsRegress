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


console.log(
  qr(A).R
)
