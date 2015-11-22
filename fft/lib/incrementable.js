function incrementableMousewheel(e, dt) {
  var step = $(this).prop('step');
  var stepVal = parseFloat(step);
  var pres = getPrecision(step);

    var newVal = this.value.length ? parseFloat(this.value) : 0;
  newVal += dt > 0 ? stepVal : - stepVal;
  this.value = newVal.toFixed(pres);
  return false
}

// TODO
function getPrecision(step) {
  return step.match(/\.(\d+)/)[1].length // no lookbehind in js =(
}
