math._round_unpatched = math.round;

math.round = function(num, pres) {
  pres = typeof pres === 'undefined' ? 0 : pres
  if(num.isComplex) {
    return math.complex(num.re.toFixed(pres), num.im.toFixed(pres));
  } else {
    return num.toFixed(pres);
  }
}
