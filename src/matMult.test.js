import { expect } from 'chai';
import matrix from './matrix';
import matMult from './matMult';

describe('initializing matrix objects', () => {
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

  it('should correct column names', () => {
    expect(myMatrix.getColNames()).to.deep.equal(["y", "x1", "x2"]);
  });

});
