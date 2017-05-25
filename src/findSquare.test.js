import { expect } from 'chai';
import findSquare from './findSquare';

describe('finding square', () => {
  it('should find the damn square', () => {
    const startValue = 5;
    expect(findSquare(startValue)).to.equal(25);
  });
});
