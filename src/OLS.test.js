import { expect } from 'chai';
import OLS from './OLS';

describe('Ordinary Least Squares Regression', () => {

  const randomData = [
    {"x1":3.7839,"x2":6.5488,"y":25.9451},
    {"x1":-4.1419,"x2":6.621,"y":0.9537},
    {"x1":-2.6889,"x2":5.0663,"y":2.9919},
    {"x1":1.5944,"x2":5.3937,"y":16.181},
    {"x1":-1.5627,"x2":9.3721,"y":13.9982},
    {"x1":4.7038,"x2":9.2064,"y":33.6724},
    {"x1":-4.6978,"x2":5.3699,"y":-7.4255},
    {"x1":-2.0447,"x2":9.0999,"y":11.8831},
    {"x1":4.5843,"x2":5.8209,"y":23.8477},
    {"x1":2.2205,"x2":8.3515,"y":23.095}];

  const model = new OLS(
    {
      data: randomData,
      outcome: 'y',
      predictors: ['x1', 'x2']
    });

  it('Refuse to fit model with no predictors', () => {
    expect( () => new OLS({
      data: randomData,
      outcome: 'y'
    })).to.throw("Need to have some predictors to fit a regression.");
  });

  it('Correctly gets coefficient estimates', () => {
    expect(model.coefs_table).to.deep.equal(
      [
        { name: 'intercept', coefficient: -1.5368715690158519 },
        { name: 'x1', coefficient: 3.1641820350665837 },
        { name: 'x2', coefficient: 2.187297892957143 }
      ]
    );
  });

});
