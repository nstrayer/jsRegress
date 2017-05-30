import { expect } from 'chai';
import genInverse from './genInverse';
import matrix from './matrix';

describe('Identity matrix generation', () => {
  const A = new matrix(
    [
      [ 1, -1,  4],
      [ 1,  4, -2],
      [ 1,  4,  2],
      [ 1, -1,  0]
    ]
  )

  it('Gets correct inverse', () => {
    expect(genInverse(A).round(3).vals).to.deep.equal(
      [
        [  0.2,    0.3,  -0.1,    0.6  ],
        [ -0.05,   0.05,  0.15,  -0.15 ],
        [  0.125, -0.125, 0.125, -0.125]
      ]
    );
  });
});
