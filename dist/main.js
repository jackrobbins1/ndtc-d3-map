// window.onload = (event) => {
//   var svg = d3.select("svg");

//   // var path = d3.geoPath();
//   var path = d3.geo.albersUsa();

// d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
//   // d3.json("https://unpkg.com/us-atlas@1/us/10m.json", function(error, us) {
//   if (error) throw error;

//   svg.append("g")
//       .attr("class", "states")
//       .selectAll("path")
//       .data(topojson.feature(us, us.objects.states).features)
//       .enter().append("path")
//       .attr("d", path);

//   svg.append("path")
//       .attr("class", "state-borders")
//       .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

//       svg.append("circle").attr("r",5).attr("transform", function() {return "translate(" + path([-75,43]) + ")";});
//   });
// };

// console.log("new code")
window.onload = (event) => {
  var width = 960,
  height = 600;

var projection = d3.geo.albersUsa()
  .scale(1280)
  .translate([width / 2, height / 2]);

var path = d3.geo.path()
  .projection(projection);

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

queue()
  .defer(d3.json, "https://bl.ocks.org/mbostock/raw/4090846/us.json")
  .defer(d3.json, "https://bl.ocks.org/mbostock/raw/4090846/us-congress-113.json")
  .await(ready);

function ready(error, us, congress) {
if (error) throw error;

svg.append("defs").append("path")
    .attr("id", "land")
    .datum(topojson.feature(us, us.objects.land))
    .attr("d", path);

svg.append("clipPath")
    .attr("id", "clip-land")
  .append("use")
    .attr("xlink:href", "#land");

svg.append("g")
    .attr("class", "districts")
    .attr("clip-path", "url(#clip-land)")
  .selectAll("path")
    .data(topojson.feature(congress, congress.objects.districts).features)
  .enter().append("path")
    .attr("d", path)
  .append("title")
    .text(function(d) { return d.id; });

svg.append("path")
    .attr("class", "district-boundaries")
    .datum(topojson.mesh(congress, congress.objects.districts, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
    .attr("d", path);

svg.append("path")
    .attr("class", "state-boundaries")
    .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
    .attr("d", path);
}

d3.select(self.frameElement).style("height", height + "px");

};

console.log("new code")