import { expect } from 'chai';
import LM from './LM';

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

  const model = new LM(
    {
      data: randomData,
      outcome: 'y',
      predictors: ['x1', 'x2'],
    });

  const mleModel = new LM(
    {
      data: randomData,
      outcome: 'y',
      predictors: ['x1', 'x2'],
      mle: true
    }
  )

  it('Refuse to fit model with no predictors', () => {
    expect( () => new LM({
      data: randomData,
      outcome: 'y'
    })).to.throw("Need to have some predictors to fit a regression.");
  });

  it('Correctly gets coefficient estimates: OLS', () => {
    expect(model.coefs_table).to.deep.equal(
      [
        {
          name: 'intercept',
          coefficient: -1.5368715690158519,
          std_err: 2.3095402908969174,
          CI_lower: -6.06357053917381,
          CI_upper: 2.989827401142106
        },
        {
          name: 'x1',
          coefficient: 3.1641820350665837,
          std_err: 0.1534986163214737,
          CI_lower: 2.8633247470764953,
          CI_upper: 3.465039323056672
        },
        {
          name: 'x2',
          coefficient: 2.187297892957143,
          std_err: 0.318300799103449,
          CI_lower: 1.563428326714383,
          CI_upper: 2.811167459199903
        }
      ]
    );
  });

  it('Correctly gets coefficient estimates: MLE', () => {
    expect(mleModel.coefs_table).to.deep.equal(
      [
        {
          name: 'intercept',
          coefficient: -1.5368715690158519,
          std_err: 1.9323000410633315,
          CI_lower: -5.324179649499982,
          CI_upper: 2.250436511468278
        },
        {
          name: 'x1',
          coefficient: 3.1641820350665837,
          std_err: 0.12842615640446808,
          CI_lower: 2.912466768513826,
          CI_upper: 3.4158973016193412
        },
        {
          name: 'x2',
          coefficient: 2.187297892957143,
          std_err: 0.2663095550237091,
          CI_lower: 1.665331165110673,
          CI_upper: 2.709264620803613
        }
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

  it("Correct sigma hat estimate for whole model", () => {
    expect(model.sig2_hat).to.equal(2.6875114650159233)
  })

  it("Covariance matrix", () => {
    expect(model.cov.vals).to.deep.equal(
      [
        [ 5.333976355276218, 0.05675970974480971, -0.7163200353355086 ],
        [ 0.05675970974480971, 0.023561825212607, -0.008593467896667642 ],
        [ -0.7163200353355086, -0.008593467896667642, 0.10131539870989421 ]
      ]
    );
  })

  it("Coefficient standard errors", () => {
    expect(model.se).to.deep.equal(
      [ 2.3095402908969174, 0.1534986163214737, 0.318300799103449 ]
    );
  })

});
