const elWise = (A, B, type = "add") => {
  let elFunc;
  switch(type){
    case "add":
      elFunc = (a,b) => a + b;
      break;
    case "subtract":
      elFunc = (a,b) => a - b;
      break;
    default:
      throw(new Error("Don't recognize that type of function."))
  }
  return A.map((row, i) => row.map( (col, j) => elFunc(col, B[i][j])));
};

module.exports = elWise;
