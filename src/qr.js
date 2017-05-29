//Calculates the QR decomposition of a matrix using
//the householder projection matrices method.
import iden from './iden';
import matrix from './matrix';
const eucNorm = (vec) => Math.sqrt(vec.reduce((ac, el) => ac + el**2, 0))

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


const qr = (mat) => {
  const {rows: m, cols: n} = mat.dim;

  //initialize an identity matrix of size n.
  let Q = iden(n);
  let R = mat.clone();
  let household;
  let H;

  //loop length
  const loopLength = n == m? n - 1: n;
  for (let i = 0; i < loopLength; i++){
    //calculate the householder matrix for the subcolumn of our A mat.
    household = householder(R.partition([i,m], [i,m]).col(0))
    let {rows: h_n, cols: h_m} = household.dim;

    //fill in the lower right of an size m identity matrix with the householder matrix.
    H = new matrix(
      iden(m).vals.map((row, i) => row.map((col, j) => {
        const n_diff = n - h_n;
        const m_diff = m - h_m
        return i >= n_diff && j >= m_diff ? household.el(i - (n - h_n), j - (m - h_m)): col;
      } ))
    );
    //update Q and A matrices;
    Q = Q.mult(H)
    R = H.mult(R)
  }
  return {
    Q,
    R
  }
};

module.exports = qr;
