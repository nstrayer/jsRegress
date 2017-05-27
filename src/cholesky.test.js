import { expect } from 'chai';
import cholesky from './cholesky';
import matrix from './matrix';

describe('Cholesky decompoision function', () => {

  const A = [
    [25, 15, -5],
    [15, 18,  0],
    [-5,  0, 11]
  ];

  const B = [
    [4, 2, 5 ],
    [2, 3, 20]
  ];

  it('Wont try and find decomp of non-square matrices', () => {
    expect( () => cholesky(B)).to.throw("Your matrix needs to be square to get a decomposition");
  });

  it('Correctly gets lower triangular cholesky decomp from 3x3 matrix.', () => {
    expect(cholesky(A)).to.deep.equal(
      [
        [ 5, 0, 0],
        [ 3, 3, 0],
        [-1, 1, 3]
      ]
    );
  });

});
