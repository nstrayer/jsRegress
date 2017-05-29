import { expect } from 'chai';
import qr from './qr';
import matrix from './matrix';

describe('Identity matrix generation', () => {

  const A = new matrix(
    [
      [ 12, -51,   4],
      [  6, 167, -68],
      [ -4,  24, -41]
    ]
  )

  const{Q, R} = qr(A);

  it('Correct Q', () => {
    expect(Q.round(3).vals).to.deep.equal(
      [
        [ -0.857,  0.394, 0.331 ],
        [ -0.429, -0.903,-0.034 ],
        [  0.286, -0.171, 0.943 ]
      ]
    );
  });

  it('Correct R', () => {
    expect(R.round(3).vals).to.deep.equal(
      [
        [ -14,  -21,  14 ],
        [   0, -175,  70 ],
        [   0,    0, -35 ]
      ]
    );
  });
});
