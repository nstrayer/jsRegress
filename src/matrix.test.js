import { expect } from 'chai';
import matrix from './matrix';

describe('initializing a matrix object', () => {
  const mat1 = [
    [4, 2,    5],
    [2, 3,   20],
    [1, 1.4, 15]
  ];

  const mat2 = [
    [4, 2, 5 ],
    [2, 3, 20]
  ];

  let myMatrix1 = new matrix(mat1);
  let myMatrix2 = new matrix(mat2);

  it('correctly output the data', () => {
    expect(myMatrix1.vals).to.deep.equal(
      [
        [4, 2,    5],
        [2, 3,   20],
        [1, 1.4, 15]
      ]
    );
  });

  it('get columns correctly', () => {
    expect(myMatrix1.col(1)).to.deep.equal( [2,3,1.4] );
  });

  it('get rows correctly', () => {
    expect(myMatrix1.row(2)).to.deep.equal( [1,1.4,15] );
  });

  it('retrieves correct element', () => {
    expect(myMatrix1.el(1,2)).to.equal( 20 );
  });

  it('gets correct dimensions of square matrix', () => {
    expect(myMatrix1.dim).to.deep.equal( {rows: 3, cols: 3} );
  });

  it('Reports if symmetry properly in true case', () => {
    expect(myMatrix1.isSymmetric()).to.equal( true );
  });

  it('Reports if symmetry properly in false case', () => {
    expect(myMatrix2.isSymmetric()).to.equal( false );
  });

  it('gets correct dimensions of non-square matrix', () => {
    expect(myMatrix2.dim).to.deep.equal( {rows: 2, cols: 3} );
  });

  it('throws error when trying to get diagonal of non-square matrix', () => {
    expect(()=>myMatrix2.diag()).to.throw("Your matrix needs to be square to get a diagonal");
  });

  it('gets correct diagonal', () => {
    expect(myMatrix1.diag()).to.deep.equal( [4,3,15] );
  });

  it('get correct trace', () => {
    expect(myMatrix1.trace()).to.equal( 22 );
  });

  it('can get a transpose of symmetric matrix', () => {
    expect(myMatrix1.t().vals).to.deep.equal(
      [
        [4, 2, 1],
        [2, 3, 1.4],
        [5,20,15]
      ]
     );
  });

  it('can get a transpose of un-symmetric matrix', () => {
    expect(myMatrix2.t().vals).to.deep.equal(
      [
        [4, 2],
        [2, 3],
        [5,20]
      ]
     );
  });
});
