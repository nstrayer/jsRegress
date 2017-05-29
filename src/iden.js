import matrix from './matrix';
import {makeDiagMat} from './helpers/helpers';

const iden = (n) => {
  return new matrix(makeDiagMat(Array(n).fill(1)));
}

module.exports = iden;
