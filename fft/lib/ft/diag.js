function appendDiagram(data, container, margin, width, height) {
  margin = typeof maring === 'undefined' ? {top: 40, right: 20, bottom: 30, left: 40} : margin;
  width  = typeof width === 'undefined' ? 960 - margin.left - margin.right : width;
  height  = typeof height === 'undefined' ? 500 - margin.top - margin.bottom : height;

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


  var svg = d3.select(container).append('svg')
              .attr('width',  width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
              .call(tip)
            .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

  x.domain(data.map(function(e) { return e.x; }));
  y.domain([0, d3.max(data, function(e) { return e.y; })]);

  svg.append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

  var barWidth = 3;

  svg.append("g")
      .attr("class", "axis y-axis")
      .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Y')

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
      .delay(function(e, i) {  return i * 20; })
      .attr('y', function(e) {  return y(e.y); })
      .attr('height', function(e) {  return height - y(e.y); })
}
