var correlation = new Correlation();

function Correlation() {
  this.fft = function(firstPoints, secondPoints) {
    var firstFFTPoints = fft.forward(firstPoints);
    var firstFftComplexity = fft.complexity;

    var conjugetedFirstFFTPoints = firstFFTPoints.map(function(e) { return math.conj(e); })

    var secondFFTPoints = fft.forward(secondPoints);
    var secondFFTComplexity = fft.complexity;

    var multipliedImages = conjugetedFirstFFTPoints.map(function(e, i) { return math.multiply(e, secondFFTPoints[i]); });

    var correlationResults = fft.inverse(multipliedImages);
    return correlationResults;
  }

  this.classic = function(firstPoints, secondPoints) {
    var len = firstPoints.length;
    var results = Util.arrayOf(0, len);
    for (var i = 0; i < len ; i++) {
      for (var j = 0; j < len; j++) {
        if (i + j < len) {
          results[i] += firstPoints[j] * secondPoints[i + j];
        } else {
          results[i] += firstPoints[j] * secondPoints[i + j - len];
        }
      }
      // results[i] = results[i] / len;
    }
    return results;
  }
}
