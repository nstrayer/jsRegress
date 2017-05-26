import { expect } from 'chai';
import matrix from './matrix';
import matMult from './matMult';

describe('initializing matrix objects', () => {
  const myData = [
    {x1: 2, x2: 5},
    {x1: 3, x2: 20},
    {x1: 1, x2: 15}
  ];

  const myData2 = [
    {y: 4, x1: 2, x2: 5, x3: 2},
    {y: 2, x1: 3, x2: 20, x4: 1}
  ];

  let matA = new matrix(myData);
  let matB = new matrix(myData2);

  it('throws error when trying to multiply two non-conformable matrices', () => {
    expect( () => matMult(matB, matA)).to.throw("To multiply two matrices the number of columns of the first need to match the rows of the second. These don't match.");
  });

  it('should multiply two matrices properly', () => {
    expect(matMult(matA,matB).vals).to.deep.equal(
      [
        [18, 19, 110,  9],
        [52, 66, 415, 26],
        [34, 47, 305, 17]
      ]
    );
  });

});
