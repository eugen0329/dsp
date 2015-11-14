var sampler = new Sampler();

function Sampler() {
  var PI   = Math.PI
      acos = Math.acos,
      sqrt = Math.sqrt;

  this.apply = function(srcSignal, num, step) {
    var  values = [];
    for (var i = 0; i < num; i++) {
      values.push(srcSignal(step * i));
    }
    return values;
  };

  return this;
}
