var samplingStep = Math.PI - 2;
function firstSignal(x) {
  return Math.sin(3 * x);
}

function secondSignal(x) {
  return Math.cos(x);
}

var c = convolution.fft(firstSignal, secondSignal, samplingStep)


var margin = {top: 20, right: 10, bottom: 15, left: 20},
    width = 300 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var container = '#convolution-freq-diag'
$(container).empty();
appendDiagram(c.map(freqResponce), container, margin, width, height, true);
var container = '#convolution-phase-diag'
$(container).empty();
appendDiagram(c.map(phaseResponce), container, margin, width, height, true);
