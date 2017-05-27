import { expect } from 'chai';
import det from './det';
import matrix from './matrix';

describe('Determinant function', () => {

  //start with an empty matrix
  const mat = new matrix([
      [25, 15, -5],
      [15, 18,  0],
      [-5,  0, 11]
    ]);

  const non_square = new matrix([
    [25, 15, -5],
    [15, 18,  0]
  ]);

  it('Wont try and find det of non-square matrices', () => {
    expect( () => det(non_square)).to.throw("Your matrix needs to be square to get an determinant");
  });

  it('Correctly gets determinant of 3x3 matrix.', () => {
    expect(det(mat)).to.equal(2025);
  });

});
