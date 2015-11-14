var fft = new FFT()

function FFT() {
  var cos = Math.cos,
      sin = Math.sin,
      PI  = Math.PI;

  var FORWARD  = 1,
      INVERSE = -1;


  this.forward = function(vec) {
    return transform(vec, FORWARD);
  }

  this.inverse = function(vec) {
    var results = transform(vec, INVERSE);
    for (var i = 0, len = results.length; i < len; i++) {
      results[i] = math.divide(results[i], results.length * 1.0) ;
    }
    return results;
  }

  function transform(vec, direction) {
    var len = vec.length;
    if (len == 1) {
      return vec;
    }

    var halfLen = Math.floor(len / 2);
    var left  = [],
        right = [];

    // var wn = math.complex({re: cos(PI/halfLen), im: -1 * direction * sin(PI/halfLen)})
      var wn = math.complex({r: 1, phi: (-2.0 * PI * direction)/len }),
        w  = math.complex(1, 0);
    for (var j = 0; j < halfLen; j++) {
      // left[j] = vec[j] + vec[j + halfLen];
      left[j] = math.add(vec[j], vec[j + halfLen]);
      // right[j] = w * (vec[j], vec[j + halfLen]);
      right[j] = math.multiply(math.subtract(vec[j], vec[j + halfLen]), w);
      // w *= wn;
      w = math.multiply(w, wn);
    }

    return merge(transform(left, direction), transform(right, direction));
    return transform(left, direction).concat(transform(right, direction));
  }

  var merge = function(left, right) {
    var merged = [];
    for (var j = 0, len = left.length; j < len; j++) {

      merged[j * 2] = left[j];
      merged[j * 2 + 1] = right[j];
    }
    return merged;
  }

  return this;
}


