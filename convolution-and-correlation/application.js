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

var diagOpts = {
  container: '#convolution-freq-diag',
  margin: margin,
  height: height,
  width: width,
  height: height,
  color: 'grey',
  legendId: 'convolution-legend',
  name: 'Convolution'
}

$(diagOpts.container).empty();
var points = convolution.fft.map(plot.responce.freq(samplingStep))
var fftPlot = plot.discrete(points, diagOpts);
plot.append.bar(fftPlot, points, diagOpts);

var lineOpts = {
  ref: ':first-child',
  color: 'red',
  interpolation: 'basis',
  legendId: diagOpts.legendId,
  name: 'Sin(3x)'
}



var points = samples1.map(plot.responce.freq(samplingStep))
plot.append.line(fftPlot, points, lineOpts);
var points = samples2.map(plot.responce.freq(samplingStep))
plot.append.line(fftPlot, points, Util.merge(lineOpts, {color: 'blue', name: 'Cos(x)'}));
var points = correlation.fft.map(plot.responce.freq(samplingStep))
plot.append.line(fftPlot, points, Util.merge(lineOpts, {color: 'green', name: 'Correlation'}));
