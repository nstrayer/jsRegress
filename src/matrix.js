//takes a array(rows) of arrays(cols)mand turns it into an object that
//is the main matrix representation we will use for this library

//Notes: Indexes at 0

import determinant from './determinant';
import matMult from './matMult';
import cholesky from './cholesky';
import {
  subsetMat,
  head,
  appendColumn,
  scaleMult,
  partition,
  elWise,
  round,
} from './helpers/helpers';
import {inv} from 'mathjs';

class matrix{
  constructor(data){
    this.vals = data;
    this.dim = this.getDimensions(data);
  }

  //get dimensions of the matrix n: rows, p: columns
  getDimensions(data){
    const n = data.length;
    const p = data[0].length ? data[0].length: 1;
    return {rows: n,cols: p}
  }

  //prints a subset of the data for easy viewing.
  head(numRows = 10, numCols = 10){
    head(this.vals, numRows, numCols);
  }

  numRows(){
    return this.dim.rows;
  }

  numCols(){
    return this.dim.cols;
  }

  //remove a column from the data (e.g. taking out response from data)
  select(wantedRows = [], type = "keep"){
    return new matrix(subsetMat(this.vals, wantedRows, type));
  }

  //make an immutable copy of the original data by simply selecting all columns
  clone(){
    return this.select([], "drop");
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

  isPosDef(){
    return this.diag(this.vals)
      .reduce((sum,el) => (el > 0? 0: 1) + sum, 0) === 0;
  }

  isPosSemiDef(){
    return this.diag(this.vals)
      .reduce( (sum,el) => (el >= 0? 0: 1) + sum, 0) === 0;
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

  scaleMult(c){
    return new matrix(scaleMult(c, this.vals))
  }

  chol(){
    return new matrix(cholesky(this.vals));
  }

  inv(){
    return new matrix(inv(this.vals));
  }

  addIntercept(){
    return new matrix(appendColumn(this.vals, 1));
  }

  //takes the ranges in vectors. E.g. rowRange = [1,4]
  partition(rowRange, colRange){
    return new matrix(partition(this.vals, rowRange, colRange));
  }

  add(B){
    return new matrix(elWise(this.vals, B.vals, "add"));
  }

  subtract(B){
    return new matrix(elWise(this.vals, B.vals, "subtract"));
  }

  round(digits = 0){
    return new matrix(round(this.vals, digits))
  }

  /**
   * Works just like the array map but for every element in a matrix.
   * @param {function} mapFunc Function that takes the (value, rowIndex, colIndex) and does whatever you desire to that element.
   * @returns {matrix} A matrix with elements supplied by your function.
   */
  map(mapFunc){
    const mat = this.vals;
    return new matrix(
      mat.map((r,i) => r.map((c,j) => mapFunc(c,i,j)))
    );
  }

  /**
   * Works just like the array filter but on the rows of a matrix object.
   * @param {function} inclusionFunc Function that takes the (value, index, total) and returns a true or false for inclusion.
   * @returns {matrix} A new, most likely smaller, matrix object.
   */
  filterRows(inclusionFunc){
    return new matrix(this.vals.filter(inclusionFunc));
  }
}

module.exports = matrix;
