import { expect } from 'chai';
import cholesky from './cholesky';
import matrix from './matrix';

describe('Cholesky decompoision function', () => {

  const non_square = new matrix([
    [25, 15, -5],
    [15, 18,  0]
  ]);
  const mat = new matrix([
    [25, 15, -5],
    [15, 18,  0],
    [-5,  0, 11]
  ]);

  it('Wont try and find decomp of non-square matrices', () => {
    expect( () => cholesky(non_square)).to.throw("Your matrix needs to be square to get an decomposition");
  });

  it('Correctly gets lower triangular cholesky decomp from 3x3 matrix.', () => {
    expect(cholesky(mat).vals).to.deep.equal(
      [
        [ 5, 0, 0],
        [ 3, 3, 0],
        [-1, 1, 3]
      ]
    );
  });

});
