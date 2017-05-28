const matrix = require('../dist/matrix.js');
const jsonToMat = require('../dist/jsonToMat.js')
const math = require('mathjs');
const d3 = require("d3");
const fs = require('fs');

//read in cars data from csv.
const iris_json = d3.csvParse(
  fs.readFileSync('./data/iris.csv', 'utf8')
);

class OLS{
  constructor(
    {
      data,
      outcome = "y",
      predictors = []
    }
  ){
    //convert data to a matrix object and extract column names.
    const {mat, colNames: names} = jsonToMat(data);
    this.mat = mat;
    this.names = names;

    const predIndexes = this.getIndexes(predictors);
    const outcomeIndex = this.getIndexes([outcome]);

    const X = mat
      .select(predIndexes)
      .addIntercept()

    const Y = mat
      .select(outcomeIndex)

    const coefs = this.calcCoefficients(X, Y).vals
    this.coefs_table = this.nameCoefficients(coefs, predictors)
  }

  getIndexes(predictors){
    if(predictors.length === 0) {
      throw(new Error("Need to have some predictors to fit a regression."))
    }
    return predictors.map(name => this.names.indexOf(name))
  }

  calcCoefficients(X, Y){
    return X.t().mult(X).inv().mult(X.t()).mult(Y);
  }

  nameCoefficients(coefs, predictors){
    return ["intercept", ...predictors]
      .map((pred, i) => ({name: pred, coefficient: coefs[i][0]}))
  }
}

// //read in iris data from csv.
// const iris_json = d3.csvParse( fs.readFileSync('./data/iris.csv', 'utf8') );
//
// //fit an ordinary least squares regression to it.
// const iris_model = new OLS(
//   {
//     data: iris_json,
//     outcome: 'Petal.Length',
//     predictors: ['Sepal.Length', 'Sepal.Width','Petal.Width']
//   });
//
// //check out the coefficient estimates.
// console.log( iris_model.coefs_table )

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
  {"x1":2.2205,"x2":8.3515,"y":23.095}];

const model = new OLS(
  {
    data: randomData,
    outcome: 'y',
    predictors: ['x1', 'x2']
  });

console.log(model.coefs_table)
