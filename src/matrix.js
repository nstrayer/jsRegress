//takes a json object and turns it into an object that
//is the main matrix representation we will use for this
//library

//Notes: Indexes at 0

class matrix{
  constructor(data){
    this.data = data;
    this.colNames = this.getColNames()
    this.vals = this.makeArrays()
    this.dim = this.getDimensions();
  }

  getColNames(){
    const colNames = Object.keys(this.data[0])
    return colNames;
  }

  makeArrays(){
    const vals = this.data.map(row => Object.values(row))
    return vals;
  }

  row(rowNum){
    return this.vals.slice(rowNum, rowNum + 1)[0]
  }

  col(colNum){
    return this.vals.map(row => row[colNum])
  }

  //get dimensions of the matrix n: rows, p: columns
  getDimensions(){
    const n = this.vals.length;
    const p = this.vals[0].length;
    return {rows: n,cols: p}
  }

  diag(){
    if(this.dim.rows != this.dim.cols){
      throw new Error("Your matrix needs to be square to get a diagonal")
    }
    return this.vals.map((row,i) => row[i])
  }

  trace(){
    return this.diag().reduce(
      (acc,cur) => acc + cur,
      0
    );
  }

  transpose(){
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
    return transposed;
  }

}

module.exports = matrix;
