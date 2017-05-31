//calculate model residuals
import matrix from '../matrix';

const getDiff = (a, b) => {
  return a.map((row, i) => [row[0] - b[i][0]])
}

module.exports = (Y, predictions) => {
  return new matrix(getDiff(Y.vals, predictions.vals));
}
