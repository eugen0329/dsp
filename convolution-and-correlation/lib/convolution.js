var convolution = new Convolution();

function Convolution() {
  this.fft = function(firstPoints, secondPoints) {
      var firstFFTPoints = fft.forward(firstPoints);
      var firstFftComplexity = fft.complexity;

      var secondFFTPoints = fft.forward(secondPoints);
      var secondFftComplexity = fft.complexity;


      var multipliedImages = firstFFTPoints.map(function(e, i) { return math.multiply(e, secondFFTPoints[i]); });

      var convolutionResult = fft.inverse(multipliedImages);
      return convolutionResult;
    }
}
