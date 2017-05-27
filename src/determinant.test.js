import { expect } from 'chai';
import determinant from './determinant';

describe('Determinant function', () => {

  //start with an empty matrix
  const mat = [
      [25, 15, -5],
      [15, 18,  0],
      [-5,  0, 11]
    ];

  const non_square = [
    [25, 15, -5],
    [15, 18,  0]
  ];

  it('Wont try and find det of non-square matrices', () => {
    expect( () => determinant(non_square)).to.throw("Your matrix needs to be square to get a determinant");
  });

  it('Correctly gets determinant of 3x3 matrix.', () => {
    expect(determinant(mat)).to.equal(2025);
  });

});
