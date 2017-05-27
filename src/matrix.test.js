import { expect } from 'chai';
import matrix from './matrix';

describe('initializing a matrix object', () => {

  const A = [
    [4, 2,  5],
    [2, 3, 20],
    [1, 2, 15]
  ];

  const B = [
    [4, 2, 5 ],
    [2, 3, 20]
  ];

  let myMatrixA = new matrix(A);
  let myMatrixB = new matrix(B);

  it('correctly output the data', () => {
    expect(myMatrixA.vals).to.deep.equal(
      [
        [4, 2,  5],
        [2, 3, 20],
        [1, 2, 15]
      ]
    );
  });

  it('get columns correctly', () => {
    expect(myMatrixA.col(1)).to.deep.equal( [2,3,2] );
  });

  it('get rows correctly', () => {
    expect(myMatrixA.row(2)).to.deep.equal( [1,2,15] );
  });

  it('retrieves correct element', () => {
    expect(myMatrixA.el(1,2)).to.equal( 20 );
  });

  it('gets correct dimensions of square matrix', () => {
    expect(myMatrixA.dim).to.deep.equal( {rows: 3, cols: 3} );
  });

  it('Reports if symmetry properly in true case', () => {
    expect(myMatrixA.isSymmetric()).to.equal( true );
  });

  it('Reports if symmetry properly in false case', () => {
    expect(myMatrixB.isSymmetric()).to.equal( false );
  });

  it('gets correct dimensions of non-square matrix', () => {
    expect(myMatrixB.dim).to.deep.equal( {rows: 2, cols: 3} );
  });

  it('throws error when trying to get diagonal of non-square matrix', () => {
    expect(()=>myMatrixB.diag()).to.throw("Your matrix needs to be square to get a diagonal");
  });

  it('gets correct diagonal', () => {
    expect(myMatrixA.diag()).to.deep.equal( [4,3,15] );
  });

  it('get correct trace', () => {
    expect(myMatrixA.trace()).to.equal( 22 );
  });

  it('can get a transpose of symmetric matrix', () => {
    expect(myMatrixA.t().vals).to.deep.equal(
      [
        [4, 2, 1],
        [2, 3, 2],
        [5,20,15]
      ]
     );
  });

  it('can get a transpose of un-symmetric matrix', () => {
    expect(myMatrixB.t().vals).to.deep.equal(
      [
        [4, 2],
        [2, 3],
        [5,20]
      ]
     );
  });

  it('gets determinant', () => {
    expect(myMatrixA.det()).to.equal(5);
  });

  it('multiply with another matrix properly', () => {
    expect(myMatrixB.mult(myMatrixA).vals).to.deep.equal(
      [
        [25, 24, 135],
        [34, 53, 370]
      ]
    );
  });

  it('should be able to combine multiple commands/ confirm cholesky is really working', () => {
    const A1 = new matrix(
      [
        [25, 15, -5],
        [15, 18,  0],
        [-5,  0, 11]
      ]
    );
    const L = A1.chol();
    return expect(
      L.mult(L.t()).vals).to.deep.equal(
      [
        [25, 15, -5],
        [15, 18,  0],
        [-5,  0, 11]
      ]
    );
  })
});
