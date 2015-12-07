var Util = (function() {
  var my = {};
  my.blank = function(e) {
    return typeof e === 'undefined' || e === null || e.length == 0
  }

  my.merge = function(hash1, hash2, keep) {
    var result = {}
    for(var key in hash1) {
      result[key] = hash1[key];
    }
    for(var key in hash2) {
      if(!keep || !(key in result)) {
        result[key] = hash2[key];
      }
    }
    return result;
  }

  my.dflt = function(arg, dflt) {
    return typeof arg === 'undefined' ? dflt : arg;
  }

  my.arrayOf = function(value, len) {
    var res = new Array(len);
    for (var i = 0, len; i < len; i++) {
      res[i] = value;
    }
    return res;
  }

  return my;
})();

