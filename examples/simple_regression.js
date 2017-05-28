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

// Look at what column names we have.
console.log("Column names", colNames);
// > Column names [
//   'Sepal.Length',
//   'Sepal.Width',
//   'Petal.Length',
//   'Petal.Width',
//   'Species' ]



//Let's predict the petal length from the sepal values.
//get predictors by taking out the petal width value
const X = iris
  .select([2,4], "drop")
  .addIntercept()

//get outcome by extracting petal width
const Y = iris
  .select([2])


//check to see we got the data we desired.
// X.head(5);
// > [
//     [ 1, '5.1', '3.5', '0.2' ],
//     [ 1, '4.9', '3', '0.2' ],
//     [ 1, '4.7', '3.2', '0.2' ],
//     [ 1, '4.6', '3.1', '0.2' ],
//     [ 1, '5', '3.6', '0.2' ]
//   ]

// Y.head(5);
// > [ [ '1.4' ], [ '1.4' ], [ '1.3' ], [ '1.5' ], [ '1.4' ] ]


X.t().mult(X).inv().mult(X.t()).mult(Y).head()
