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

var correlation = {
  fft: correlation.fft(samples1, samples2),
}




var margin = {top: 20, right: 10, bottom: 15, left: 20},
    width = 300 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var container = '#convolution-freq-diag'
$(container).empty();
var plot = appendDiagram(convolution.fft.map(freqResponce), container, margin, width, height);
var lineOpts = { ref: ':first-child', stroke: 'red', interpolation: 'basis'}
appendLine(plot, samples1.map(freqResponce), lineOpts);
appendLine(plot, samples2.map(freqResponce), Util.merge(lineOpts, {stroke: 'blue'}));
appendLine(plot, correlation.fft.map(freqResponce), Util.merge(lineOpts, {stroke: 'green'}));



// var container = '#correlation-freq-diag'
// $(container).empty();
// var plot = appendDiagram(correlation.fft.map(freqResponce), container, margin, width, height);
// var lineOpts = { ref: ':first-child', stroke: 'red', interpolation: 'basis'}
// appendLine(plot, samples1.map(freqResponce), lineOpts);
// appendLine(plot, samples2.map(freqResponce), Util.merge(lineOpts, {stroke: 'blue'}));


