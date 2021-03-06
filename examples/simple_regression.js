const OLS = require('../dist/OLS.js');
const matrix = require('../dist/matrix.js');
const d3 = require("d3");
const fs = require('fs');

//read in cars data from csv.
const iris_json = d3.csvParse(
  fs.readFileSync('./data/iris.csv', 'utf8')
);

const matMult = (A,B) => {
  const A_rows = A.length;
  const A_cols = A[0].length;
  const B_rows = B.length
  const B_cols = B[0].length

  //make sure we can actually multiply these matricies
  if(A_cols !== B_rows){
    throw new Error("To multiply two matrices the number of columns of the first need to match the rows of the second. These don't match.")
  }

  let result = [];

  for (let i = 0; i < A_rows; i++) {
    result[i] = [];
    for (var j = 0; j < B_cols; j++) {
      let sum = 0;
      for (let k = 0; k < A_cols; k++) {
        sum += A[i][k] * B[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}


const randomData = [
  {"x1":3.7839,"x2":6.5488,"y":25.9451},
  {"x1":-4.1419,"x2":6.621,"y":0.9537},
  {"x1":-2.6889,"x2":5.0663,"y":2.9919},
  {"x1":1.5944,"x2":5.3937,"y":16.181},
  {"x1":-1.5627,"x2":9.3721,"y":13.9982},
  {"x1":4.7038,"x2":9.2064,"y":33.6724},
  {"x1":-4.6978,"x2":5.3699,"y":-7.4255},
  {"x1":-2.0447,"x2":9.0999,"y":11.8831},
  {"x1":4.5843,"x2":5.8209,"y":23.8477},
  {"x1":2.2205,"x2":8.3515,"y":23.095}
];

const model = new OLS(
  {
    data: randomData,
    outcome: 'y',
    predictors: ['x1', 'x2']
  }
);
console.log(model.coefs_table)
// > [
//   {
//     name: 'intercept',
//     coefficient: -1.5368715690158519,
//     std_err: 2.3095402908969174,
//     CI_lower: -6.06357053917381,
//     CI_upper: 2.989827401142106
//   },
//   {
//     name: 'x1',
//     coefficient: 3.1641820350665837,
//     std_err: 0.1534986163214737,
//     CI_lower: 2.8633247470764953,
//     CI_upper: 3.465039323056672
//   },
//   {
//     name: 'x2',
//     coefficient: 2.187297892957143,
//     std_err: 0.318300799103449,
//     CI_lower: 1.563428326714383,
//     CI_upper: 2.811167459199903
//   }
// ]
