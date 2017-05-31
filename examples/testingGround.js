const d3 = require("d3");
const fs = require('fs');
const matrix = require('../dist/matrix.js');
const LRM = require('../dist/GLM.js')

//read in cars data from csv.
const data = d3.csvParse(
  fs.readFileSync('./data/logisticData.csv', 'utf8')
);

const model = new LRM(
  {
    data: data,
    outcome: "y",
    predictors: ["x1", "x2"]
  }
)


console.log(
  model.coefs
)
