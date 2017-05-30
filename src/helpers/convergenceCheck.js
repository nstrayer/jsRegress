
/**
 * Checks the convergence of an array of values by looking at percent change. In order to meet convergence criteria all elements must have converged.
 * @param {array} oldVals Previous array of values from given estimator.
 * @param {array} newVals Latest array of values from given estimator.
 * @param {number} [thresh=0.000001] Threshold for percent change in a given value to stop iteration.
 * @returns {boolean} logical containing if the array has converged.
 */

const convergenceCheck = (oldVals, newVals, thresh=0.000001) => oldVals
  .map((v, i) => Math.abs((v - newVals[i])/v) > thresh)
  .reduce((sum,el)=> el? sum + 1: sum, 0) === 0

module.exports = convergenceCheck;
