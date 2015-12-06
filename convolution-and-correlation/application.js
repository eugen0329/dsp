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

var convolutionRes = {
  fft: convolution.fft(samples1, samples2),
  classic: convolution.classic(samples1, samples2),
}

var correlationRes = {
  fft: correlation.fft(samples1, samples2),
  classic: correlation.classic(samples1, samples2),
}

var margin = {top: 20, right: 10, bottom: 15, left: 20},
    width = 300 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var red = '#F34C44',
    green = '#2BD288',
    blue = '#3C70BC',
    grey = '#8FA1AE'

var diagOpts = {
  container: '#fft-freq-diag',
  margin: margin,
  height: height,
  width: width,
  height: height,
  color: grey,
  legendId: 'fft-convolution-legend',
  name: 'Convolution',
  interpolation: 'basis'
}
var lineOpts = {
  ref: ':first-child',
  color: red,
  interpolation: 'basis',
  legendId: diagOpts.legendId,
  name: 'Sin(3x)'
}

$(diagOpts.container).empty();
var points = convolutionRes.fft.map(plot.responce.freq(samplingStep))
var fftPlot = plot.discrete(points, diagOpts);
plot.append.line(fftPlot, points, diagOpts);

var points = correlationRes.fft.map(plot.responce.freq(samplingStep))
plot.append.line(fftPlot, points, Util.merge(lineOpts, {color: green, name: 'Correlation'}));

var points = samples1.map(plot.responce.freq(samplingStep))
plot.append.line(fftPlot, points, lineOpts);

var points = samples2.map(plot.responce.freq(samplingStep))
plot.append.line(fftPlot, points, Util.merge(lineOpts, {color: blue, name: 'Cos(x)'}));

// ####################################
// will be fixed
// ####################################
var diagOpts = {
  container: '#classic-freq-diag',
  margin: margin,
  height: height,
  width: width,
  height: height,
  color: grey,
  legendId: 'classic-convolution-legend',
  name: 'Convolution',
  interpolation: 'basis'
}
var lineOpts = {
  ref: ':first-child',
  color: red,
  interpolation: 'basis',
  legendId: diagOpts.legendId,
  name: 'Sin(3x)'
}
$(diagOpts.container).empty();
var points = convolutionRes.classic.map(plot.responce.freq(samplingStep))
var fftPlot = plot.discrete(points, diagOpts);
plot.append.line(fftPlot, points, diagOpts);

var points = correlationRes.classic.map(plot.responce.freq(samplingStep))
plot.append.line(fftPlot, points, Util.merge(lineOpts, {color: green, name: 'Correlation'}));

var points = samples1.map(plot.responce.freq(samplingStep))
plot.append.line(fftPlot, points, lineOpts);

var points = samples2.map(plot.responce.freq(samplingStep))
plot.append.line(fftPlot, points, Util.merge(lineOpts, {color: blue, name: 'Cos(x)'}));
