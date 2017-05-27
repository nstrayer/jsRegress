//takes a array(rows) of arrays(cols)mand turns it into an object that
//is the main matrix representation we will use for this library

//Notes: Indexes at 0

import determinant from './determinant';
import matMult from './matMult';

class matrix{
  constructor(data){
    this.vals = data;
    this.dim = this.getDimensions(data);
  }

  //get dimensions of the matrix n: rows, p: columns
  getDimensions(data){
    const n = data.length;
    const p = data[0].length;
    return {rows: n,cols: p}
  }

  //grab a row
  row(rowNum){
    return this.vals.slice(rowNum, rowNum + 1)[0]
  }

  //grab a column
  col(colNum){
    return this.vals.map(row => row[colNum]);
  }

  el(row, col){
    return this.vals[row][col];
  }

  diag(){
    if(this.dim.rows != this.dim.cols){
      throw new Error("Your matrix needs to be square to get a diagonal")
    }
    return this.vals.map((row,i) => row[i])
  }

  isSymmetric(){
    return this.dim.rows === this.dim.cols;
  }

  trace(){
    return this.diag().reduce(
      (acc,cur) => acc + cur,
      0
    );
  }

  t(){
    const columns_new = this.dim.rows;
    const rows_new = this.dim.cols;

    let transposed = [];

    for(let i = 0; i < rows_new; i++){
      let newRow = [];
      for(let j = 0; j < columns_new; j++){
        newRow.push(this.vals[j][i])
      };
      transposed.push(newRow)
    };
    // return transposed;
    return new matrix(transposed);
  }

  det(){
    return determinant(this.vals);
  }

  mult(matB){
    return new matrix(matMult(this.vals, matB.vals));
  }

}

module.exports = matrix;
