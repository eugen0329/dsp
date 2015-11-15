var dft = new DFT();

function DFT() {
  var cos = Math.cos,
      sin = Math.sin,
      PI  = Math.PI;

  this.forward = function(vec) {
    var result = Array.apply(null, Array(vec.length)).map(function() { return math.complex(0.0,0.0); });

    for (var i = 0, len = vec.length; i < len; i++) {
      for (var j = 0, len2 = vec.length; j < len2; j++) {
        var w = math.complex({r: 1, phi: ((-2.0 * PI) / len * i * j)});
        result[i] = math.add(math.multiply(vec[j], w), result[i]);
      }
      // result[i] = math.divide(result[i], math.complex(len * 1.0));
    }

    return result;
  }

  return this;
}
