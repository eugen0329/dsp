math._round_unpatched = math.round;

math.round = function(num, pres) {
  pres = typeof pres === 'undefined' ? 0 : pres
  if(num.isComplex) {
    return math.complex(num.re.toFixed(pres), num.im.toFixed(pres));
  } else {
    return math._round_unpatched(num, pres);
  }
}

math.complex.abs = function(v) {
  if(v.isComplex) {
    return Math.sqrt( v.re * v.re + v.im * v.im);
  } else {
    return Math.abs(v);
  }
}


math.complex.phase = function(v) {
  if(v.isComplex) {
    if (v.im  > -0.00001 && v.im < 0.00001) {
      return Math.atan2(0, v.re)
    } else {
      return Math.atan2(v.im, v.re)
    }
  } else {
    return 0;
  }
}
