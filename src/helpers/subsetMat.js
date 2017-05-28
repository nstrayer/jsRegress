//extracts a subset of rows. If keepRows is set to false it drops the columns supplied.

// import cloneMat from './cloneMat';

const subsetMat = (mat, wantedRows, type) => {
  // let newMat = cloneMat(mat);

  return mat.map(row => {
    return row.filter((col, index, orig) => type === "keep"? wantedRows.includes(index): !wantedRows.includes(index) )
  } );
}

module.exports = subsetMat;
