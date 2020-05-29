var warper = {};

warper.bilinear = function(start,end) {

  var u0 = start[0][0],
      v0 = start[0][1],
      u1 = start[1][0],
      v1 = start[1][1],
      u2 = start[2][0],
      v2 = start[2][1],
      u3 = start[3][0],
      v3 = start[3][1],
      x0 = end[0][0],
      y0 = end[0][1],
      x1 = end[1][0],
      y1 = end[1][1],
      x2 = end[2][0],
      y2 = end[2][1],
      x3 = end[3][0],
      y3 = end[3][1];

  var square = [
    [1,u0,v0,u0 * v0,0,0,0,0],
    [1,u1,v1,u1 * v1,0,0,0,0],
    [1,u2,v2,u2 * v2,0,0,0,0],
    [1,u3,v3,u3 * v3,0,0,0,0],
    [0,0,0,0,1,u0,v0,u0 * v0],
    [0,0,0,0,1,u1,v1,u1 * v1],
    [0,0,0,0,1,u2,v2,u2 * v2],
    [0,0,0,0,1,u3,v3,u3 * v3]
  ];

  var inverted = invert(square);

  var s = multiply(inverted,[x0,x1,x2,x3,y0,y1,y2,y3]);

  return function(p) {

    return [
      s[0] + s[1] * p[0] + s[2] * p[1] + s[3] * p[0] * p[1],
      s[4] + s[5] * p[0] + s[6] * p[1] + s[7] * p[0] * p[1],
    ];

  };

};

warper.projective = function(start,end) {

  var u0 = start[0][0],
      v0 = start[0][1],
      u1 = start[1][0],
      v1 = start[1][1],
      u2 = start[2][0],
      v2 = start[2][1],
      u3 = start[3][0],
      v3 = start[3][1],
      x0 = end[0][0],
      y0 = end[0][1],
      x1 = end[1][0],
      y1 = end[1][1],
      x2 = end[2][0],
      y2 = end[2][1],
      x3 = end[3][0],
      y3 = end[3][1];

  var square = [
    [u0,v0,1,0,0,0,-u0 * x0,-v0 * x0],
    [u1,v1,1,0,0,0,-u1 * x1,-v1 * x1],
    [u2,v2,1,0,0,0,-u2 * x2,-v2 * x2],
    [u3,v3,1,0,0,0,-u3 * x3,-v3 * x3],
    [0,0,0,u0,v0,1,-u0 * y0,-v0 * y0],
    [0,0,0,u1,v1,1,-u1 * y1,-v1 * y1],
    [0,0,0,u2,v2,1,-u2 * y2,-v2 * y2],
    [0,0,0,u3,v3,1,-u3 * y3,-v3 * y3]
  ];

  var inverted = invert(square);

  var s = multiply(inverted,[x0,x1,x2,x3,y0,y1,y2,y3]);

  return function(p) {

    return [
      (s[0] * p[0] + s[1] * p[1] + s[2]) / (s[6] * p[0] + s[7] * p[1] + 1),
      (s[3] * p[0] + s[4] * p[1] + s[5]) / (s[6] * p[0] + s[7] * p[1] + 1)
    ];

  };

}

function multiply(matrix,vector) {

  return matrix.map(function(row){

    var sum = 0;

    row.forEach(function(c,i){
      sum += c * vector[i];
    });

    return sum;

  });

}

function invert(matrix) {

  var size = matrix.length,
      base,
      swap,
      augmented;

  // Augment w/ identity matrix
  augmented = matrix.map(function(row,i){
    return row.slice(0).concat(row.slice(0).map(function(d,j){
      return j === i ? 1 : 0;
    }));
  });

  // Process each row
  for (var r = 0; r < size; r++) {

    base = augmented[r][r];

    // Zero on diagonal, swap with a lower row
    if (!base) {

      for (var rr = r + 1; rr < size; rr++) {

        if (augmented[rr][r]) {
          // swap
          swap = augmented[rr];
          augmented[rr] = augmented[r];
          augmented[r] = swap;
          base = augmented[r][r];
          break;
        }

      }

      if (!base) {
        throw new Error("Not invertable :(");
      }

    }

    // 1 on the diagonal
    for (var c = 0; c < size * 2; c++) {

      augmented[r][c] = augmented[r][c] / base;

    }

    // Zeroes elsewhere
    for (var q = 0; q < size; q++) {

      if (q !== r) {

        base = augmented[q][r];

        for (var p = 0; p < size * 2; p++) {
            augmented[q][p] -= base * augmented[r][p];
        }

      }

    }

  }

  return augmented.map(function(row){
    return row.slice(size);
  });

}