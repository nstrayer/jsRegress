const eucNorm = (vec) => Math.sqrt(vec.reduce((ac, el) => ac + el**2, 0))

module.exports = eucNorm;
