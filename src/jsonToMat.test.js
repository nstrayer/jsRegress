import { expect } from 'chai';
import jsonToMat from './jsonToMat';

describe('Conversion of json to a matrix object', () => {

  const data1 = [
    {x1:4, x2:2, x3: 5},
    {x1:2, x2:3, x3:20}
  ];

  const data2 = [
    {y:4, x2:2, x3: 5},
    {y:2, x2:3, x3:20},
    {y:1, x2:2, x3:15}
  ];

  let mat1 = jsonToMat(data1);
  let mat2 = jsonToMat(data2);

  it('should get correct column names', () => {
    expect(mat1.colNames).to.deep.equal(["x1", "x2", "x3"]);
  });

  it('should get correct column names again', () => {
    expect(mat2.colNames).to.deep.equal(["y", "x2", "x3"]);
  });

  it('should parse to correct matrix', () => {
    expect(mat1.mat.vals).to.deep.equal(
      [
        [4, 2,  5],
        [2, 3, 20]
      ]
    );
  })

});
