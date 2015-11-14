
var values, results, inverse;
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

    values = sampler.apply(srcSignal, 16,  Math.PI- 2);
    rounded_values = $.map(values, function(num) { return math.round(num, pres); });

    results = fft.direct(values, 1);
    rounded_results = $.map(results, function(num) { return math.round(num, pres); });


    inverse = fft.inverse(results);
    rounded_inverse = $.map(inverse, function(num) { return math.round(num, pres); });

    var row;
    var table_body = ''
    for (var i = 0, len = rounded_values.length; i < len; i++) {
      row  = '<td>' + rounded_values[i]  + '</td>';
      row += '<td>' + rounded_results[i] + '</td>';
      row += '<td>' + rounded_inverse[i] + '</td>';
      table_body += '<tr>' + row + '</tr>'
    }

    $('tbody').html(table_body)

    // $('body').html('<p>['   + rounded_values.join(", ") + ']</p>');
    // $('body').append('<p>[' + rounded_results.join(", ") + ']</p>');
    // $('body').append('<p>[' + rounded_inverse.join(", ") + ']</p>');
  });
})();

function srcSignal(x) {
  return Math.sin(3 * x) + Math.cos(x);
}
