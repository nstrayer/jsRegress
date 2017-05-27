# jsRegress

[![Build Status](https://travis-ci.org/nstrayer/jsRegress.svg?branch=master)](https://travis-ci.org/nstrayer/jsRegress)

_Because R is just boring._

This is currently an undocumented project to build a regression modeling
library for javascript. Some packages already do this, see [`simple-statistics`](https://github.com/simple-statistics/simple-statistics) but these packages don't allow you to do a few things I find important as a statitician. Those being

- Perform regression with more than one predictor
- Get any information on coefficient estimates such as confidence intervals etc.
- Perform generalized linear regressions using non-identity link functions.
- You get the picture.

There is a reason why these things haven't been done in javascript, it just isn't the language for data-science/ statistics. However, it has to start somewhere, right?
