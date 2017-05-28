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

  it("returns the correct prediction estimates", () => {
    expect(model.predictions.vals).to.deep.equal(
      [
        [ 24.76025327487033 ],
        [ -0.16049779078888804 ],
        [ 1.0364666719823834 ],
        [ 15.305728912937251 ],
        [ 14.018035747369236 ],
        [ 33.483947209250985 ],
        [ -4.655994977961086 ],
        [ 11.897517520004211 ],
        [ 25.70073043945412 ],
        [ 23.756412992881074 ]
      ]
    )
  })

  it("returns the correct residiuals", () => {
    expect(model.residuals.vals).to.deep.equal(
      [
        [ 1.1848467251296704 ],
        [ 1.114197790788888 ],
        [ 1.9554333280176164 ],
        [ 0.8752710870627496 ],
        [ -0.019835747369235435 ],
        [ 0.1884527907490181 ],
        [ -2.7695050220389144 ],
        [ -0.01441752000421026 ],
        [ -1.8530304394541197 ],
        [ -0.6614129928810755 ]
      ]
    )
  })

  it("Residual sum of squares (RSS)", () => {
    expect(model.RSS).to.equal(18.812580255111463)
  })

});
