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
}
