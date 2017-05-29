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

  // it('Correct Q', () => {
  //   expect(Q.round(3).vals).to.deep.equal(
  //     [
  //
  //     ]
  //   );
  // });

  it('Correct R', () => {
    expect(R.round(3).vals).to.deep.equal(
      [
        [ -14, -21, 14 ],
        [ 0, -174.912, 71.075 ],
        [ 0,-5.553,-32.761]
      ]
    );
  });
});
