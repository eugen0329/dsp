
var values, fftResults, fftInverse;
(function() {
  $(document).ready(function() {
    //   y=sin(3x)+cos(x)
    //   y' = a *f(kx + b)
    //   Ty' = T(f[x])/k
    //   Ty = LCM( T(sin)/3, T(cos)) =  LCM( 2π/3, 2π ) =
    //                                    LCM( 2π/3, 6π/3 ) = 2π
    //   LCM - least common multiple

    var pres = 3;
    var sampler = new Sampler();

    values = sampler.apply(srcSignal, 16, Math.PI- 2);
    values = [1,2,3,4]
    valuesRounded = $.map(values, function(num) { return math.round(num, pres); });

    fftResults = fft.forward(values);
    fftResultsRounded = $.map(fftResults, function(num) { return math.round(num, pres); });

    dftResults = dft.forward(values);
    dftResultsRounded = $.map(dftResults, function(num) { return math.round(num, pres); });

    fftInverse = fft.inverse(fftResults);
    fftInverseRounded = $.map(fftInverse, function(num) { return math.round(num, pres); });

    dftInverse = dft.inverse(dftResults);
    dftInverseRounded = $.map(dftInverse, function(num) { return math.round(num, pres); });

    var row;
    var table_body = ''
    for (var i = 0, len = valuesRounded.length; i < len; i++) {
      row  = '<td>' + valuesRounded[i]  + '</td>';
      row += '<td>' + fftResultsRounded[i] + '</td>';
      row += '<td>' + dftResultsRounded[i] + '</td>';
      row += '<td>' + fftInverseRounded[i] + '</td>';
      row += '<td>' + dftInverseRounded[i] + '</td>';
      table_body += '<tr>' + row + '</tr>'
    }

    $('tbody').html(table_body)

    // $('body').html('<p>['   + valuesRounded.join(", ") + ']</p>');
    // $('body').append('<p>[' + fftResultsRounded.join(", ") + ']</p>');
    // $('body').append('<p>[' + fftInverseRounded.join(", ") + ']</p>');
  });
})();

function srcSignal(x) {
  return Math.sin(3 * x) + Math.cos(x);
}
