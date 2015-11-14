var fft = new FFT()

function FFT() {
  var cos = Math.cos,
      sin = Math.sin,
      PI  = Math.PI;

  var DIRECT  = 1,
      INVERSE = -1;


  this.direct = function(vec) {
    return transform(vec, DIRECT)
  }

  function transform(vec, direction) {
    var len = vec.length;
    if (len == 1) {
      return vec;
    }

    var halfLen = Math.floor(len / 2);
    var left  = [],
        right = [];

    var wn = math.complex({r: 1, phi: (-2.0 * PI)/len }),
        w  = math.complex(1, 0);
    for (var j = 0; j < halfLen; j++) {
      // left[j] = vec[j] + vec[j + halfLen];
      left[j] = math.add(vec[j], vec[j + halfLen]);
      // right[j] = w * (vec[j], vec[j + halfLen]);
      right[j] = math.multiply(math.subtract(vec[j], vec[j + halfLen]), w);
      // w *= wn;
      w = math.multiply(w, wn);
    }

    return merge(transform(left, 1), transform(right, 1));
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


