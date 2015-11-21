function appendDiagram(data) {
  var margin = {top: 40, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var xFormat = d3.format(".1f");

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
              // .tickFormat(formatPercent);


  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "(" + d.x + ", <span style='color:red'>" + d.y + "</span>)";
  })


  var svg = d3.select('body').append('svg')
              .attr('width',  width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
              .call(tip)
            .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

  // x.domain(data.map(function(e) { return d3.round(e.x, 2); }));
  x.domain(data.map(function(e) { return e.x; }));
  y.domain([0, d3.max(data, function(e) { return e.y; })]);

  svg.append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

  var barWidth = 2;

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Y')

  var gEnter = svg.selectAll('.bar')
      .data(data)
    .enter().append('rect')
      .attr('width', barWidth)
      .attr('x', function(e) { return x(e.x) - barWidth / 2; })
      .attr('y', function(e) {  return y(e.y); })
      .attr('height', function(e) {  return height - y(e.y); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
}
