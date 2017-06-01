import { expect } from 'chai';
import GLM from './GLM';
import {csvParse} from "d3";
import fs from 'fs';

describe('Iteratively re-weighted logistic GLM', () => {

  const data = csvParse(
   fs.readFileSync('./examples/logistic_regression/logisticData.csv', 'utf8')
  );


  const model = new GLM(
    {
      data: data,
      type: "logistic",
      outcome: "y",
      predictors: ["x1", "x2"]
    }
  )

  it('Refuse to fit model with no predictors', () => {
    const data = csvParse(
     fs.readFileSync('./examples/logistic_regression/logisticData.csv', 'utf8')
    );

    expect( () => new GLM({
      data: data,
      type: "logistic",
      outcome: 'y'
    })).to.throw("Need to have some predictors to fit a regression.");
  });

  it("Covariance estimate", () => {
    expect(model.cov.round(3).vals).to.deep.equal(
      [
        [ 19.348, -5.401, -3.754 ],
        [ -5.401, 1.641, 1.068 ],
        [ -3.754, 1.068, 0.741 ]
      ]
    )
  })
  //
  // it("Predictions", ()=> {
  //   expect(model.predictions.round(3).vals).to.deep.equal(
  //     [
  //       [ 25.462 ],
  //       [ 0.306 ],
  //       [ 1.859 ],
  //       [ 16.181 ],
  //       [ 13.998 ],
  //       [ 33.672 ],
  //       [ -3.951 ],
  //       [ 11.919 ],
  //       [ 26.573 ],
  //       [ 24.049 ]
  //     ]
  //   )
  // })
  //
  it('Coefficient table', ()=> {
    expect(model.coefTable).to.deep.equal(
      [
        { name: 'intercept',
          coefficient: -12.706495553361048,
          std_err: 4.398619779860115,
          CI_lower: -21.327790321886873,
          CI_upper: -4.085200784835223 },
        { name: 'x1',
          coefficient: 3.7947000608869184,
          std_err: 1.2811233292740447,
          CI_lower: 1.2836983355097908,
          CI_upper: 6.305701786264046 },
        { name: 'x2',
          coefficient: 2.5530591661646254,
          std_err: 0.8608728520420319,
          CI_lower: 0.8657483761622429,
          CI_upper: 4.240369956167008 }
      ]
    )
  })
  // it('Correctly gets coefficient estimates: OLS', () => {
  //   expect(model.coefs_table).to.deep.equal(
  //     [
  //       {
  //         name: 'intercept',
  //         coefficient: -1.5368715690158519,
  //         std_err: 2.3095402908969174,
  //         CI_lower: -6.06357053917381,
  //         CI_upper: 2.989827401142106
  //       },
  //       {
  //         name: 'x1',
  //         coefficient: 3.1641820350665837,
  //         std_err: 0.1534986163214737,
  //         CI_lower: 2.8633247470764953,
  //         CI_upper: 3.465039323056672
  //       },
  //       {
  //         name: 'x2',
  //         coefficient: 2.187297892957143,
  //         std_err: 0.318300799103449,
  //         CI_lower: 1.563428326714383,
  //         CI_upper: 2.811167459199903
  //       }
  //     ]
  //   );
  // });


  //

  //
  // it("returns the correct residiuals", () => {
  //   expect(model.residuals.vals).to.deep.equal(
  //     [
  //       [ 1.1848467251296704 ],
  //       [ 1.114197790788888 ],
  //       [ 1.9554333280176164 ],
  //       [ 0.8752710870627496 ],
  //       [ -0.019835747369235435 ],
  //       [ 0.1884527907490181 ],
  //       [ -2.7695050220389144 ],
  //       [ -0.01441752000421026 ],
  //       [ -1.8530304394541197 ],
  //       [ -0.6614129928810755 ]
  //     ]
  //   )
  // })
  //
  // it("Residual sum of squares (RSS)", () => {
  //   expect(model.RSS).to.equal(18.812580255111463)
  // })
  //
  // it("Correct sigma hat estimate for whole model", () => {
  //   expect(model.sig2_hat).to.equal(2.6875114650159233)
  // })
  //
  // it("Covariance matrix", () => {
  //   expect(model.cov.vals).to.deep.equal(
  //     [
  //       [ 5.333976355276218, 0.05675970974480971, -0.7163200353355086 ],
  //       [ 0.05675970974480971, 0.023561825212607, -0.008593467896667642 ],
  //       [ -0.7163200353355086, -0.008593467896667642, 0.10131539870989421 ]
  //     ]
  //   );
  // })
  //
  // it("Coefficient standard errors", () => {
  //   expect(model.se).to.deep.equal(
  //     [ 2.3095402908969174, 0.1534986163214737, 0.318300799103449 ]
  //   );
  // })
  //
  // it("R2", () => {
  //   expect(model.R2).to.equal(0.9871710360075683);
  // })

});
