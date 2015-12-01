var convolution = new Convolution();

function Convolution() {
  this.fft = function(first, second, samplingStep) {
      var pres = 3;
      var roundedDataset  = function(e, i) { return {x: math.round(i * samplingStep, 2), y: math.complex.abs(e)}; }
      var yRound = function(e) {  return math.round(e, pres); };
      var counts = 16;

      firstValues  = sampler.apply(first, counts, samplingStep);
      secondValues = sampler.apply(second, counts, samplingStep);


      firstValuesRounded = firstValues.map(yRound);
      secondValuesRounded = secondValues.map(yRound);


      firstFftResults = fft.forward(firstValues);
      var firstFftComplexity = fft.complexity;
      firstFftResultsRounded = firstFftResults.map(yRound);

      secondFftResults = fft.forward(secondValues);
      var secondFftComplexity = fft.complexity;
      secondFftResultsRounded = secondFftResults.map(yRound);
      var multipliedImages = firstFftResultsRounded.map(function(e, i) { return math.multiply(e, secondFftResults[i]); });
      var convolutionResult = fft.inverse(multipliedImages);
      return convolutionResult;
    }
}
