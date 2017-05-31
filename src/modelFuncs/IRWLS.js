import matrix from '../matrix';
import convergenceCheck from '../helpers/convergenceCheck';
import makeDiagMat from '../helpers/makeDiagMat';
import initializeMat from '../helpers/initializeMat';

//recursive function to estimate coefficients using iteratively re-weighted least-squares.
//In the future consider going to the QR/cholesky based version shown here http://bwlewis.github.io/GLM/

const calcZ = (LP, Y, p, pPrime) => {
  return LP.add(
    Y.subtract(p).map((el, i, j) => el/pPrime.el(i,j))
  )
}
const calcW = (pprime, p, variance) => {
  return new matrix( makeDiagMat( pprime.map((el, i, j) => (el**2)/variance(p.el(i,0)) ).col(0) ))
}
const calcB_new = (X, W, z) => {
  return X.t().mult(W).mult(X).inv().mult(X.t().mult(W).mult(z))
}

const IRWLS = (
  {
    X,
    Y,
    linkInv,
    linkInvPrime,
    variance,
    B_old = new matrix(initializeMat(X.dim.cols, 1, 0)),
    itNum = 0,
    maxIts = 1,
    thresh = 0.001,
  }
) => {
  const LP = X.mult(B_old)
  const p = LP.map(linkInv);
  const pPrime = LP.map(linkInvPrime);
  const z = calcZ(LP, Y, p, pPrime);
  const W = calcW(pPrime, p,variance);
  const B_new = calcB_new(X, W, z)
  const converged = convergenceCheck(B_old.col(0), B_new.col(0), thresh);
  if(converged || itNum >= maxIts){
    return {coefs: B_new, W}
  } else {
    const newParams = {
      X,
      Y,
      linkInv,
      linkInvPrime,
      variance,
      B_old: B_new,
      itNum: itNum + 1,
      maxIts,
      thresh,
    }
    return IRWLS(newParams)
  }
}

module.exports = IRWLS;
