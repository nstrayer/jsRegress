

const matrix = require('../dist/matrix.js');
const genInverse = require('../dist/genInverse.js');

const A = new matrix(
  [
    [ 1, -1,  4],
    [ 1,  4, -2],
    [ 1,  4,  2],
    [ 1, -1,  0]
  ]
)

genInverse(A).round(3).head()
// > [
//     [ 0.2,    0.3,  -0.1,    0.6  ],
//     [-0.05,   0.05,  0.15,  -0.15 ],
//     [ 0.125, -0.125, 0.125, -0.125]
//   ]
