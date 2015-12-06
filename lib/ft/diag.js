var freqResponce  = function(e, i) { return {x: math.round(i * samplingStep, 2), y: math.complex.abs(e)}; }
var phaseResponce = function(e, i) { return {x: math.round(i * samplingStep, 2), y: math.complex.phase(e)}; }

var plot = new Plot();
function Plot() {
  var that = this;
  this.bar = function(data, opts) {
    margin = opts.margin;
    width  = opts.width;
    height  = opts.height;

    var x = d3.scale.ordinal()
      .rangeRoundPoints([0, width])

      var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')

      var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "(" + d.x + ", <span style='color:red'>" + d.y + "</span>)";
      })

    var svg = d3.select(opts.container).append('svg')
      .attr('width',  width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .call(tip)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

          x.domain(data.map(function(e) { return e.x; }));
          y.domain([d3.min(data, function(e) { return e.y; }) - 1, d3.max(data, function(e) { return e.y; }) + 1]);

          if(line) {
            var line = d3.svg.line()
              .interpolate('basis')
              .x(function(e) { return x(e.x); })
              .y(function(e) { return y(e.y); })
          }

          var xAxisElem = svg.append('g')
          .attr('class', 'axis x-axis')
          .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)

            xAxisElem.selectAll(".tick text")
            .call(ifOvelap(removeAll))

            var barWidth = 3;

            svg.append("g")
            .attr("class", "axis y-axis")
            .call(yAxis)
            // .append('text')
            //   .attr('transform', 'rotate(-90)')
            //   .attr('y', 6)
            //   .attr('dy', '.71em')
            //   .style('text-anchor', 'end')
            //   .text('Y')

            svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .attr('width', barWidth)
            .attr('x', function(e) { return x(e.x) - barWidth / 2; })
            .attr('y', height)
            .attr('height', 0)
            .transition()
            .duration(300)
            .delay(function(e, i) {  return i * 400 / data.length; })
            .attr('y', function(e) {  return y(e.y); })
            .attr('height', function(e) {  return height - y(e.y); })

    var legend = d3.select(opts.container)
      .append('ul')
      .attr('class', 'list-unstyled')
      .attr('id', opts.legendId);

    that.append.legend(opts.legendId, opts.name, opts.color);

    return {svg: svg, x: x, y: y}
  }

  this.append = {};

  this.append.legend = function(legendId, name, color) {
    d3.select('#' + legendId)
      .append('li')
      .attr('class', 'legend-key')
      .style('border-left-color', color)
      .text(name)
  }

  // opts.keys == ['stroke', 'interpolation', 'ref']
  this.append.line = function(plot, data, opts) {
    var x = plot.x, y = plot.y, svg = plot.svg;
    var line = d3.svg.line()
      .x(function(e) { return x(e.x); })
      .y(function(e) { return y(e.y); });

    if('interpolation' in opts) {
      line.interpolate(opts.interpolation)
    }

    // debugger
    var path = 'ref' in opts ? svg.insert('path', opts.ref) : svg.append('path')

      path.datum(data)
      .attr('class', 'line')
      .attr('d', line);

    var color = 'color' in opts ? opts.color : 'red';
    path.attr('stroke', color);
    that.append.legend(opts.legendId, opts.name, color)

  }

  //##############################
  // Private methods
  //##############################
  function ifOvelap(callback) {
    return function(collection) {
      var elements = collection[0];
      var prev = elements[0];
      for (var i = 1, len = elements.length; i < len; i++) {
        if (prev.getBoundingClientRect().right >= elements[i].getBoundingClientRect().left) {
          callback(elements);
          break;
        }
        prev = elements[i];
      }
    }
  }

  function removeAll(collection) {
    for (var i = 0, len = collection.length; i < len; i++) {
      collection[i].remove();
    }
  }

}

