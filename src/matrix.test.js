import { expect } from 'chai';
import matrix from './matrix';

describe('initializing matrix object', () => {
  const myData = [
    {y: 4, x1: 2, x2: 5},
    {y: 2, x1: 3, x2: 20},
    {y: 1, x1: 1.4, x2: 15}
  ];

  const myData2 = [
    {y: 4, x1: 2, x2: 5},
    {y: 2, x1: 3, x2: 20}
  ];

  let myMatrix = new matrix(myData);
  let myMatrix2 = new matrix(myData2);

  it('should get correct column names', () => {
    expect(myMatrix.getColNames()).to.deep.equal(["y", "x1", "x2"]);
  });

  it('get output array correct', () => {
    expect(myMatrix.vals).to.deep.equal(
      [
        [4, 2,   5],
        [2, 3,  20],
        [1, 1.4,15]
      ]
    );
  });

  it('get columns correctly', () => {
    expect(myMatrix.col(1)).to.deep.equal( [2,3,1.4] );
  });

  it('get rows correctly', () => {
    expect(myMatrix.row(2)).to.deep.equal( [1,1.4,15] );
  });

  it('gets correct dimensions of square matrix', () => {
    expect(myMatrix.dim).to.deep.equal( {rows: 3, cols: 3} );
  });

  it('gets correct dimensions of non-square matrix', () => {
    expect(myMatrix2.dim).to.deep.equal( {rows: 2, cols: 3} );
  });

  it('throws error when trying to get diagonal of non-square matrix', () => {
    expect(()=>myMatrix2.diag()).to.throw("Your matrix needs to be square to get a diagonal");
  });

  it('gets correct diagonal', () => {
    expect(myMatrix.diag()).to.deep.equal( [4,3,15] );
  });

  it('get correct trace', () => {
    expect(myMatrix.trace()).to.equal( 22 );
  });

  it('can get a transpose of symmetric matrix', () => {
    expect(myMatrix.transpose()).to.deep.equal(
      [
        [4, 2, 1],
        [2, 3, 1.4],
        [5,20,15]
      ]
     );
  });

  it('can get a transpose of un-symmetric matrix', () => {
    expect(myMatrix2.transpose()).to.deep.equal(
      [
        [4, 2],
        [2, 3],
        [5,20]
      ]
     );
  });
});
