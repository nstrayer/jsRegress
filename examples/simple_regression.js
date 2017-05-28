const matrix = require('../dist/matrix.js');
const jsonToMat = require('../dist/jsonToMat.js')
const math = require('mathjs');
const d3 = require("d3");
const fs = require('fs');

const A = new matrix(
  [
    [25, 15, -5],
    [15, 18,  0],
    [-5,  0, 11]
  ]
);

//read in cars data from csv.
const iris_json = d3.csvParse(
  fs.readFileSync('./data/iris.csv', 'utf8')
);

//convert data to a matrix object and extract column names.
const {mat: iris , colNames} = jsonToMat(iris_json);

// //Look at what column names we have.
// console.log("Column names", colNames);
// // > Column names [ 'Sepal.Length',
// //   'Sepal.Width',
// //   'Petal.Length',
// //   'Petal.Width',
// //   'Species' ]
//
//
// //add helper for slicing out a column to ease deal of getting y and x values.
// console.log(iris);


const cloneMat = (mat) => JSON.parse(JSON.stringify(mat));

const subsetMat = (mat, colNum) => {
  let newMat = cloneMat(mat);
  newMat.map(row => row.splice(colNum,1)); //remove the  column
  return newMat;
}

console.log(A.vals);
console.log(subsetMat(A.vals, 1));

//Let's predict the petal length from the sepal values.
// const iris =
//
// console.log(A.chol())
// console.log(math.inv(A.vals));
