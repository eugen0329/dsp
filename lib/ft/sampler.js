var sampler = new Sampler();

function Sampler() {
  var PI   = Math.PI
      acos = Math.acos,
      sqrt = Math.sqrt;

  this.apply = function(srcSignal, num, step) {
    var  values = [];
    for (var i = 0; i < num; i++) {
      var x = step * i
      values.push(srcSignal(x));
    }
    return values;
  };

  return this;
}
