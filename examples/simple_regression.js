const matrix = require('../dist/matrix.js');
const math = require('mathjs');
const A = new matrix(
  [
    [25, 15, -5],
    [15, 18,  0],
    [-5,  0, 11]
  ]
);


console.log(A.chol())
console.log(math.inv(A.vals));
