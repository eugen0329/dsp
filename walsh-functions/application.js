var stepsCount = 16;
var samplingStep = Math.PI - 3;

function sourceSignal(x) {
  return Math.sin(3 * x) + Math.cos(x);
}

var fwt = new FWT();
var samples = sampler.apply(sourceSignal, stepsCount, samplingStep);
var fwtRes = {forward: fwt.forward(samples)}
fwtRes.inverse = fwt.inverse(fwtRes.forward);

var margin = {top: 20, right: 10, bottom: 15, left: 20},
    width = 740 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;

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
  interpolation: 'linear'
}
var lineOpts = {
  ref: ':first-child',
  color: red,
  interpolation: diagOpts.interpolation,
  legendId: diagOpts.legendId,
}

$(diagOpts.container).empty();
var points = fwtRes.forward.map(plot.responce.freq(samplingStep))
var fwtPlot = plot.discrete(points, diagOpts);

points = samples.map(plot.responce.freq(samplingStep))
var params = Util.merge(diagOpts, {name: 'Sin(3x) + Cos(x) [src signal]', color: grey})
plot.append.bar(fwtPlot, points, params);

points = fwtRes.inverse.map(plot.responce.freq(samplingStep));
params = Util.merge(lineOpts, {name: 'Inverse', color: green})
plot.append.line(fwtPlot, points, params);

points = fwtRes.forward.map(plot.responce.freq(samplingStep));
params = Util.merge(lineOpts, Util.merge(diagOpts, {name: 'Inverse', color: red}))
plot.append.line(fwtPlot, points, params);

var table = new Table();
var rnd = function(e) { return math.round(e, 3); }
var t = table.build([samples, fwtRes.inverse, fwtRes.forward], ['Samples', 'Inverse', 'Forward'], rnd)
$('#dataset-container').html(t);
