
function handleResults(samplingStep) {
  //   y=sin(3x)+cos(x)
  //     y' = a *f(kx + b)
  //     Ty' = T(f[x])/k
  //   Ty = LCM(T(sin)/3, T(cos)) =  LCM( 2π/3, 2π ) =
  //                                    LCM( 2π/3, 6π/3 ) = 2π
  //   LCM - least common multiple
  var values, fftResults, fftInverse;

  var pres = 3;
  var yRound = function(e) {  return math.round(e, pres); };
  var roundDiag = function(e, i) {  return {x: math.round(i * samplingStep, 2), y: math.complex.abs(e)}; }
  var sampler = new Sampler();

  // var samplingStep = Math.PI- 2;
  values = sampler.apply(srcSignal, 8, samplingStep);
  // values = [1,2,3,4, 5, 6, 7, 8]
  valuesRounded = values.map(yRound);

  fftResults = fft.forward(values);
  var fftComplexity = fft.complexity;
  fftResultsRounded = fftResults.map(yRound);

  dftResults = dft.forward(values);
  var dftComplexity = dft.complexity;
  dftResultsRounded = dftResults.map(yRound);

  fftInverse = fft.inverse(fftResults);
  fftInverseRounded = fftInverse.map(yRound);

  dftInverse = dft.inverse(dftResults);
  dftInverseRounded = dftInverse.map(yRound);

  var row;
  var table_body = '';
  for (var i = 0, len = valuesRounded.length; i < len; i++) {
    row  = '<td>' + i + '</td>';
    row += '<td>' + valuesRounded[i]  + '</td>';
    row += '<td>' + fftResultsRounded[i] + '</td>';
    row += '<td>' + dftResultsRounded[i] + '</td>';
    row += '<td>' + fftInverseRounded[i] + '</td>';
    row += '<td>' + dftInverseRounded[i] + '</td>';
    table_body += '<tr>' + row + '</tr>'
  }

  $('#dataset tbody').html(table_body);

  $('#fft-complexity').html(fftComplexity);
  $('#dft-complexity').html(dftComplexity);

  var margin = {top: 20, right: 10, bottom: 15, left: 20},
      width = 300 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

  $('#fft-forward-diag').empty();
  appendDiagram(fftResults.map(roundDiag), '#fft-forward-diag', margin, width, height);
  $('#dft-forward-diag').empty();
  appendDiagram(dftResults.map(roundDiag), '#dft-forward-diag', margin, width, height);
  $('#fft-inverse-diag').empty();
  appendDiagram(fftInverse.map(roundDiag), '#fft-inverse-diag', margin, width, height);
  $('#dft-inverse-diag').empty();
  appendDiagram(dftInverse.map(roundDiag), '#dft-inverse-diag', margin, width, height);
  return 0;
}

function srcSignal(x) {
  return Math.sin(3 * x) + Math.cos(x);
}

$('#signal-config-form').on('submit', function(e) {
  step = parseFloat(this.sampling_step.value);
  handleResults(step);
  return false;
});

var samplingStep = Math.PI - 2;
var pres = getPrecision($('.sampling-step').prop('step'))
$('.sampling-step').val(samplingStep.toFixed(pres));

$('.incrementable').on('mousewheel', function(e, dt) {
  var step = $(this).prop('step');
  var stepVal = parseFloat(step);
  var pres = getPrecision(step);

  var newVal = typeof this.value !== 'undefined' ? parseFloat(this.value) : 0;
  newVal += dt > 0 ? stepVal : - stepVal;
  this.value = newVal.toFixed(pres);
  //  is required for validation
  $(this).valid();
  return false
})

// TODO
function getPrecision(step) {
  return step.toString().match(/\.(\d+)/)[1].length // no lookbehind in js =(
}

validateSignalConfig(Math.PI * 2)
$('#update-btn').click();
