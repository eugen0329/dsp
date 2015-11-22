var dft = new DFT();

function DFT() {
  var cos = Math.cos,
      sin = Math.sin,
      PI  = Math.PI;


  var FORWARD  = 1,
      INVERSE = -1;

  // TODO
  var that = this;
  this.complexity = 0;

  this.forward = function(vec) {
    complexity = 0;
    return transform(vec, FORWARD);
  }

  this.inverse = function(vec) {
    complexity = 0;
    var results = transform(vec, INVERSE);
    for (var i = 0, len = results.length; i < len; i++) {
      results[i] = math.divide(results[i], results.length) ;
      complexity += 1;
    }
    return results;
  }

  function transform(vec, dir) {
    var result = Array.apply(null, Array(vec.length)).map(function() { return math.complex(0, 0); });

    for (var i = 0, len = vec.length; i < len; i++) {
      for (var j = 0, len2 = vec.length; j < len2; j++) {
        var w = math.complex({r: 1, phi: ((dir * 2.0 * PI) / len * i * j)});
        // result[i] += (vec[j] + w) * result[i]
        result[i] = math.add(math.multiply(vec[j], w), result[i]);
        that.complexity += 1;
      }
    }

    return result;
  }

  return this;
}
