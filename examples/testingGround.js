const OLS = require('../dist/OLS.js');
const matrix = require('../dist/matrix.js');
// const eigen = require('../dist/eigen.js');
// const qr = require('../dist/qr.js');
const iden = require('../dist/iden');
const eucNorm = require('../dist/eucNorm');

const A = new matrix(
  [
    [ 1, -1,  4],
    [ 1,  4, -2],
    [ 1,  4,  2],
    [ 1, -1,  0]
  ]
)

// import iden from './iden';
// import matrix from './matrix';
// import eucNorm from './eucNorm';

const householder = (vec) => {
  const norm = eucNorm(vec);
  const signedNorm = vec[0] >= 0 ? Math.abs(norm): -Math.abs(norm);
  const denom = vec[0] + signedNorm;
  let v = vec.map(el => el/denom);
  v[0] = 1;

  //turn our v vec into a matrix object so we can do some algebra on it.
  const vec_v = new matrix(v.map(el => [el]));
  const beta = 2/ vec_v.t().mult(vec_v).vals[0][0];

  return iden(vec.length)
    .subtract(
      vec_v.mult(vec_v.t()).scaleMult(beta)
    );
};

//defaults to rounding to the tenth decimal place to avoid machine epsilon errors.
const qr = (mat, tol = 10) => {
  const {rows: m, cols: n} = mat.dim;

  //initialize an identity matrix of size n.
  let Q = iden(m);
  let R = mat.clone();
  let household;
  let H;

  //loop length
  const loopLength = n == m? n - 1: n;
  for (let i = 0; i < loopLength; i++){
    //calculate the householder matrix for the subcolumn of our A mat.
    household = householder(R.partition([i,m], [i,m]).col(0))

    let {rows: h_m, cols: h_n} = household.dim;

    //fill in the lower right of an size m identity matrix with the householder matrix.
    H = new matrix(
      iden(m).vals.map((row, i) => row.map((col, j) => {
        const n_diff = m - h_n;
        const m_diff = m - h_m
        return i >= n_diff && j >= m_diff ? household.el(j - m_diff,i - n_diff): col;
      } ))
    );
    // console.log("---------------------------------------")
    // console.log(i)
    // H.head()
    //update Q and A matrices;
    Q = Q.mult(H).round(tol)
    R = H.mult(R).round(tol)
  }
  return {
    Q,
    R
  }
};

qr(A)
//
// const gen_inverse = (A) => {
//   // const {Q, R} = qr(A);
//
//   return A;
// }
//
//
// console.log(gen_inverse(A))
