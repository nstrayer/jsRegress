//private function to grab indexes from column names and a data matrix.
module.exports = (predictors, colNames) => {
  if(predictors.length === 0) {
    throw(new Error("Need to have some predictors to fit a regression."))
  }
  return predictors.map(name => colNames.indexOf(name))
}
