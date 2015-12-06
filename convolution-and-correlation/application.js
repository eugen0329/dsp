var stepsCount = 16;
var samplingStep = Math.PI - 3;
function firstSignal(x) {
  return Math.sin(3 * x);
}
function secondSignal(x) {
  return Math.cos(x);
}

var samples1 = sampler.apply(firstSignal, stepsCount, samplingStep);
var samples2 = sampler.apply(secondSignal, stepsCount, samplingStep);

var convolution = {
  fft: convolution.fft(samples1, samples2),
}




var margin = {top: 20, right: 10, bottom: 15, left: 20},
    width = 300 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var container = '#convolution-freq-diag'
$(container).empty();
appendDiagram(convolution.fft.map(freqResponce), container, margin, width, height);


