import matrix from './matrix';
import qr from './qr';

//returns the number of zeros in a given row.
const numZeros = (vec) => vec.reduce( (sum, val) => val === 0? sum + 1: sum, 0)

/**
 * Computes a generalized inverse of a matrix using a QR decomposition and the moore-penrose algorithm.
 * This Algorithm is special in that it generates a unique generalized inverse.
 * @param {matrix} A An object of the class matrix.
 * @returns {matrix} Generalized inverse of A.
 */
const genInverse = (A) => {
  const {Q, R} = qr(A);

  // strip away rows that are all zeros and invert
  const R1_inv = R.filterRows( (row, i) => numZeros(row) !== row.length ).inv();

  //add columns of zeros to make R1_inv conformable with multiplication by Q.
  const cols_to_add = Q.dim.rows - R1_inv.dim.cols;
  const padding = Array(cols_to_add).fill(0)

  const R1_inv_padd = new matrix(R1_inv.vals.map(row => [...row, ...padding]));
  return R1_inv_padd.mult(Q.t());
}

module.exports = genInverse;
