import { expect } from 'chai';
import iden from './iden';

describe('Identity matrix generation', () => {

  const size3 = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];

  const size4 = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];


  it('size three', () => {
    expect(iden(3).vals).to.deep.equal(size3);
  });

  it('size four', () => {
    expect(iden(4).vals).to.deep.equal(size4);
  });
});
