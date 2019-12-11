window.onload = (event) => {
  var width = 960,
    height = 500;

var projection = d3.geo.albersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

    // original below
// var pinPath = "M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
var pinPath = "M0 -23.55c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"

// original below
// d3.json("./data/alber.json", function(error, us) {
//   svg.insert("path", ".graticule")
//       .datum(topojson.feature(us, us.objects.land))
//       .attr("class", "land")
//       .attr("d", path);

  // svg.insert("path", ".graticule")
  //     .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); }))
  //     .attr("class", "county-boundary")
  //     .attr("d", path);


      // original below
  // svg.insert("path", ".graticule")
  //     .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
  //     .attr("class", "state-boundary")
  //     .attr("d", path);

  // svg
  //   .append("path")
  //     .style("fill","none")
  //     .style("stroke","#000")
  //     .attr("d", projection.getCompositionBorders());

  d3.json("./data/alber.json", function(error, us) {
    if (error) throw error;
  
    var bisectId = d3.bisector(function(d) { return d.id; }).left;
  
    var features = topojson.feature(us, us.objects.states).features;
  
    svg.append("path")
        .datum(topojson.mesh(us, us.objects.states))
        .attr("class", "background")
        .attr("d", path);
  
    var merge = svg.append("g")
        .attr("class", "merge")
      .selectAll("path")
        .data(components)
      .enter().append("path")
        .style("fill", function(d, i) { return color(i); })
        .style("stroke", function(d, i) { return d3.lab(color(i)).darker(); });
  
    svg.append("g")
        .attr("class", "foreground")
        .style("cursor", "pointer")
        .style("stroke-opacity", .5)
      .selectAll("path")
        .data(features)
      .enter().append("path")
        .attr("d", function(d) { d.color = null; return path(d); })
        .on("mouseover", function() { this.style.stroke = "black"; })
        .on("mouseout", function() { this.style.stroke = "none"; })
        .call(d3.behavior.drag()
          .on("dragstart", dragstart)
          .on("drag", drag));
  
    top.location.hash.split("").slice(1, features.length).forEach(function(c, i) {
      if ((c = +c) >= 0 && c < 10) assign(features[i], c ? c - 1 : null);
    });
  
    redraw();
  
  
  // svg.append("circle").attr("r",3).attr("transform", function() {return "translate(" + projection([-75,43]) + ")";});
  // svg.append("circle").attr("r",3).attr("transform", function() {return "translate(" + projection([-100,43]) + ")";}).style("fill", "yellow");
  // svg.append("circle").attr("r",10).attr("transform", function() {return "translate(" + projection([-90,43]) + ")";}).style("fill", "yellow");
  // svg.append("circle").attr("r",3).attr("transform", function() {return "translate(" + projection([-134.45,58.31]) + ")";}).style("fill", "red");
  // svg.append("path").attr("d", pinPath).attr("height",24).attr("width",24).attr("viewBox", "0 0 48 48").attr("transform", function() {return "translate(" + projection([-136.2,62.5]) + ")";}).style("fill", "yellow");
  // svg.append("path").attr("d", pinPath).attr("height",24).attr("width",24).attr("transform", function() {return "translate(" + projection([-134.45,58.31]) + ")";}).style("fill", "purple");
  // svg.append("path").attr("d", pinPath).attr("height",24).attr("width",24).attr("transform", function() {return "translate(" + projection([-88.0121478,41.8333925]) + ")";}).style("fill", "purple");
  svg.append("path").attr("d", pinPath).attr("transform", function() {return "translate(" + projection([-87.6228744,41.8901482]) + ")";}).style("fill", "purple");
  svg.append("path").attr("d", pinPath).attr("transform", function() {return "translate(" + projection([-100.6228744,41.8901482]) + ")";}).style("fill", "red");
  svg.append("path").attr("d", pinPath).attr("transform", function() {return "translate(" + projection([-134.5177285,58.2888866]) + ")";}).style("fill", "green");
  svg.append("path").attr("d", pinPath).attr("transform", function() {return "translate(" + projection([-67.140466,44.8138728]) + ")";}).style("fill", "pink");


});

  d3.select(self.frameElement).style("height", height + "px");
};

{/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg> */}