math._round_unpatched = math.round;

math.round = function(num, pres) {
  pres = typeof pres === 'undefined' ? 0 : pres
  if(num.isComplex) {
    return math.complex(math._round_unpatched(num.re, pres), math._round_unpatched(num.im, pres));
  } else {
    return math._round_unpatched(num);
  }
}
