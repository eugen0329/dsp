// Fast walsh transform
function FWT() {
  this.forward = function forward(samples) {
    var len = samples.length;
    if(len == 1) {
      return samples;
    }

    var left = [], right = [], results = [], halfLen = len / 2;

    for (var i = 0; i < halfLen; i++) {
      left[i] = samples[i] + samples[i + halfLen];
      right[i] = samples[i] - samples[i + halfLen];
    }

    left = forward(left);
    right = forward(right);

    for (i = 0; i < halfLen; i++) {
        results[i] = left[i];
        results[i + halfLen] = right[i];
    }

    return results;
  }

  this.inverse = function inverse(samples) {
    var len = samples.length;
    if(len == 1) {
      return samples;
    }

    var left = [], right = [], results = [], halfLen = len / 2;

    for (var i = 0; i < halfLen; i++) {
      left[i] = samples[i];
      right[i] = samples[i + halfLen];
    }

    left = inverse(left);
    right = inverse(right);

    for (i = 0; i < halfLen; i++) {
        results[i]           = (left[i] + right[i]) / 2;
        results[i + halfLen] = (left[i] - right[i]) / 2;
    }

    return results;
  }
}
