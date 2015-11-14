(function() {
  $(document).ready(function() {
    //   y=sin(3x)+cos(x)


    var result4 = fft.direct([1,2,3,4], 1);
    var result8 = fft.direct([1,2,3,4,5,6,7,8], 1);

    result4 = $.map(result4, function(num) { return math.round(num, 2); });
    result8 = $.map(result8, function(num) { return math.round(num, 2); });
    $('body').html('<p>[' + result4.join(", ") + ']</p>');
    $('body').append('<p>[' + result8.join(", ") + ']</p>');


  });
})();

