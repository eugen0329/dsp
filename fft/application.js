(function() {
  $(document).ready(function() {
    //   y=sin(3x)+cos(x)

    var cos = Math.cos,
        sin = Math.sin,
        PI  = Math.PI;

    var result4 = fft([1,2,3,4], 1);
    var result8 = fft([1,2,3,4,5,6,7,8], 1);

    result4 = $.map(result4, function(num, _i) { return math.round(num, 2); });
    result8 = $.map(result8, function(num, _i) { return math.round(num, 2); });
    $('body').html('<p>[' + result4.join(", ") + ']</p>');
    $('body').append('<p>[' + result8.join(", ") + ']</p>');

    function fft(vec, direction) {
      var len = vec.length;
      if (len == 1) {
        return vec;
      }

      var halfLen = Math.floor(len / 2);
      var left  = [],
          right = [];
      // var wn = math.complex({re: cos(PI/halfLen), im: direction * sin(PI/halfLen)}),
      var wn = math.complex({r: 1, phi: (-2.0 * PI)/len }),
          w  = math.complex(1, 0);
      for (var j = 0; j < halfLen; j++) {
        left[j] = math.add(vec[j], vec[j + halfLen]);
        right[j] = math.multiply(math.subtract(vec[j], vec[j + halfLen]), w);
        w = math.multiply(w, wn);
      }

      if(len == 4 ) {
      }

      return fft(left, direction).concat(fft(right, direction));
    }
  });
})();

