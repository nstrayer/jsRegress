const d3 = require("d3");
const fs = require('fs');
const GLM = require('../../dist/GLM');




const data = d3.csvParse(
 fs.readFileSync('./logisticData.csv', 'utf8')
);


const model = new GLM(
  {
    data: data,
    type: "logistic",
    outcome: "y",
    predictors: ["x1", "x2"]
  }
)

console.log(model.coefTable)
