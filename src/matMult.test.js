import { expect } from 'chai';
import matrix from './matrix';
import matMult from './matMult';

describe('Basic matrix multiplication', () => {

  const A = [
    [4, 2,  5],
    [2, 3, 20],
    [1, 2, 15]
  ];

  const B = [
    [4, 2, 5 ],
    [2, 3, 20]
  ];

  it('throws error when trying to multiply two non-conformable matrices', () => {
    expect( () => matMult(A, B)).to.throw("To multiply two matrices the number of columns of the first need to match the rows of the second. These don't match.");
  });

  it('should multiply two matrices properly', () => {
    expect(matMult(B,A)).to.deep.equal(
      [
        [25, 24, 135],
        [34, 53, 370]
      ]
    );
  });

});
