var stepsCount = 16;
var samplingStep = Math.PI - 3;

function sourceSignal(x) {
  return Math.sin(3 * x) + Math.cos(x);
}


var fwt = new FWT();
var samples = sampler.apply(sourceSignal, stepsCount, samplingStep);
var fwtResutl = fwt.inverse(fwt.forward(samples));
