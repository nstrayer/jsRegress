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

  it('correctly clones the data', () => {
    const orig = new matrix(
      [
        [4, 2,  5],
        [2, 3, 20],
        [1, 2, 15]
      ]
    );

    //clone matrix
    const cloned = orig.clone();

    //change something in the original matrix
    orig[0,0] = 100;

    //make sure our clone didn't change too.
    return expect(cloned.vals).to.deep.equal(
      [
        [4, 2,  5],
        [2, 3, 20],
        [1, 2, 15]
      ]
    );
  });


  it('can select a subset of columns by position', () => {
    expect(myMatrixA.select([0,2]).vals).to.deep.equal(
      [
        [4,  5],
        [2, 20],
        [1, 15]
      ]
    )
  })

  it('can drop a subset of columns by position', () => {
    expect(myMatrixA.select([0,2], false).vals).to.deep.equal(
      [
        [2],
        [3],
        [2]
      ]
    )
  })

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

  it('Correctly identifies positive definite matrix', () => {
    expect(myMatrixA.isPosDef()).to.equal(true);
  });

  it('Correctly identifies non-positive definite matrix', () => {
    expect(
      new matrix(
        [
          [-3, 15, -5],
          [15, 18,  0],
          [-5,  0, 11]
        ]
      ).isPosDef()).to.equal(false);
  });

  it('Correctly identifies positive semi-definite matrix', () => {
    expect(
      new matrix(
        [
          [0, 15, -5],
          [15, 18,  0],
          [-5,  0, 11]
        ]
      ).isPosSemiDef()).to.equal(true);
  });

  it('Correctly identifies non semi-definite matrix', () => {
    expect(
      new matrix(
        [
          [-1, 15, -5],
          [15, 18,  0],
          [-5,  0, 11]
        ]
      ).isPosSemiDef()).to.equal(false);
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

  it('can add an intercept term to matrix for regression purposes', () => {
    expect(myMatrixA.addIntercept().vals).to.deep.equal(
      [
        [1, 4, 2,  5],
        [1, 2, 3, 20],
        [1, 1, 2, 15]
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

  it('multiply with another matrix', () => {
    expect(myMatrixB.mult(myMatrixA).vals).to.deep.equal(
      [
        [25, 24, 135],
        [34, 53, 370]
      ]
    );
  });

  it('multiply by a scaler', () => {
    expect(myMatrixB.scaleMult(2).vals).to.deep.equal(
      [
        [8, 4, 10 ],
        [4, 6, 40]
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

  it('invert a matrix properly', () => {
    const A1 = new matrix(
      [
        [25, 15, -5],
        [15, 18,  0],
        [-5,  0, 11]
      ]
    );
    expect(A1.inv().vals).to.deep.equal(
      [
        [  0.09777777777777778,
          -0.08148148148148149,
           0.044444444444444446 ],
        [ -0.08148148148148149,
           0.12345679012345678,
          -0.037037037037037035 ],
        [  0.044444444444444446,
          -0.037037037037037035,
           0.1111111111111111 ]
      ]
    );
  });

  it('Partitioning by column and row ranges', () => {
    expect(myMatrixA.partition([1,2],[1,2]).vals).to.deep.equal(
      [
        [3, 20],
        [2, 15]
      ]
    );
  });

  it('Element wise subtraction', () => {
    expect(myMatrixA.subtract(myMatrixA.clone()).vals).to.deep.equal(
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    );
  });

  it('Element wise addition', () => {
    const a = new matrix(
      [
        [1,3],
        [4,5]
      ]
    );
    const b = new matrix(
      [
        [3,2],
        [1,8]
      ]
    );
    return expect(a.add(b).vals).to.deep.equal(
      [
        [4, 5],
        [5,13]
      ]
    );
  });
});
