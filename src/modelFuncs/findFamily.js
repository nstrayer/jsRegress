
//family information for logistic regression.
const binomialFamily = (() => {
  const link = (p) => Math.log(p/ (1 - p));
  const linkInv = (x) => 1/(1 + Math.exp(-x));
  const linkInvPrime = (x) => linkInv(x)*(1 - linkInv(x));
  const variance = (x) => x * (1 - x);

  return {
    link,
    linkInv,
    linkInvPrime,
    variance
  }
})()


module.exports = (type) => {
  switch(type){
    case "logistic":
      return binomialFamily;
    default:
      throw(new Error("I'm sorry, that type is not implemented yet."));
      break;
  }
}
