import { expect } from 'chai';
import eigen from './eigen';
import matrix from './matrix';

describe('Eigen Value and vector', () => {

  const A = new matrix(
    [
      [ 12, -51,   4],
      [  6, 167, -68],
      [ -4,  24, -41]
    ]
  )

  it('Correct Results using QR decomp', () => {
    expect(eigen(A)).to.deep.equal(
      [
        { value: 156.1366165904, vector: [ -0.3281477008655543, 0.9368811932412463, 0.12071750563820174 ] },
        { value: -34.1967030622, vector: [ 0.3754041464146661, 0.012071027245626708, 0.9267826159115801 ] },
        { value: 16.0599846987,  vector: [ 0.8668275820080302, 0.3494390990291421, -0.355671560768939 ] }
      ]
    );
  });
});
