function Table() {
  this.build = function(columns, headers, modifier) {
    var tbody = '', thead = '';
    modifier = Util.dflt(modifier, function(e) { return e; })

    for(var i = 0, len = headers.length; i < len; i++) {
      thead += '<td>' + headers[i]  + '</td>';
    }
    thead = '<thead><tr class="active">' + thead + '</tr></thead>'

    for (var j = 0, colCount = columns[0].length; j < colCount; j++) {
      var row = '';
      for (i = 0, len = columns.length; i < len; i++) {
        row += '<td>' + modifier(columns[i][j]) + '</td>';
      }
      tbody += '<tr>' + row + '</tr>'
    }

    return '<table class="table table-hover" id="dataset">' + thead + tbody + '</table>';
  }
}
