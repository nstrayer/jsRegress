import getIndexes from './getIndexes';
module.exports = (predictors, outcome, mat, colNames) => {
  const predIndexes = getIndexes(predictors, colNames);
  const outcomeIndex = getIndexes([outcome], colNames);
  const X = mat.select(predIndexes).addIntercept();
  const Y = mat.select(outcomeIndex)
  return {
    X,
    Y
  }
}
