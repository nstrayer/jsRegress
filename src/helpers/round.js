//simply rounds a matrix to a given number of decimal places.

const roundTo = (value, decimals) =>  {
  const rounded = Number(Math.round(value+'e'+decimals)+'e-'+decimals)
  return rounded? rounded: 0; //returns nan if rounds to zero unfortunately. 
};

const round = (mat, digits) => {
  return mat.map(row => row.map(col => roundTo(col, digits)));
}

module.exports = round;
