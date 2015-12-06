var convolution = new Convolution();

function Convolution() {
  this.fft = function(firstPoints, secondPoints) {
    var firstFFTPoints = fft.forward(firstPoints);
    var firstFftComplexity = fft.complexity;

    var secondFFTPoints = fft.forward(secondPoints);
    var secondFFTComplexity = fft.complexity;


    var multipliedImages = firstFFTPoints.map(function(e, i) { return math.multiply(e, secondFFTPoints[i]); });

    var convolutionResult = fft.inverse(multipliedImages);
    return convolutionResult;
  };

  this.classic = function(firstPoints, secondPoints) {
    var len = firstPoints.length;
    var results = Util.arrayOf(0, len);
    for (var i = 0; i < len ; i++) {
      for (var j = 0; j < len; j++) {
        if (i - j < 0) {
          results[i] += firstPoints[j] * secondPoints[i - j + len];
        } else {
          results[i] += firstPoints[j] * secondPoints[i - j];
        }
      }
      // results[i] = results[i] / len;
    }
    return results;
  }
}
