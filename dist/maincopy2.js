window.onload = (event) => {
  var width = 960,
    height = 600;

  var projection = d3.geo.albersUsa()
      .scale(1280)
      .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection);

  // var color = d3.scale.category10().domain(d3.range(9)),
  //     selectedColor = 0,
  //     dragColor;

  // var components = color.domain().map(function() { return []; });

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  // var legend = svg.append("g")
  //     .attr("class", "legend")
  //     .attr("transform", "translate(" + ((width - color.domain().length * 24) / 2) + ",10)")
  //     .style("cursor", "pointer")
  //   .selectAll("rect")
  //     .data(color.domain())
  //   .enter().append("rect")
  //     .attr("x", function(d) { return d * 24; })
  //     .attr("width", 24 - 3)
  //     .attr("height", 24 - 3)
  //     .style("stroke", function(d) { return d ? null : "#000"; })
  //     .style("fill", color)
  //     .on("click", clicklegend);

  // d3.select(self)
  //     // .on("keydown", keydown)
  //     .node().focus();

  d3.json("./data/alber.json", function(error, us) {
    if (error) throw error;

    var bisectId = d3.bisector(function(d) { return d.id; }).left;

    var features = topojson.feature(us, us.objects.states).features;

    // svg.append("path")
    //     .datum(topojson.mesh(us, us.objects.states))
    //     .attr("class", "background")
    //     .attr("d", path);

    // var merge = svg.append("g")
    //     .attr("class", "merge")
    //   .selectAll("path")
    //     .data(components)
    //   .enter().append("path")
        // .style("fill", function(d, i) { return color(i); })
        // .style("stroke", function(d, i) { return d3.lab(color(i)).darker(); });
        // .style("stroke", function(d, i) { return this.style.stroke = "black" });

var myColors = [
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.7)", 
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.3)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.7)",
  "rgba(0, 79, 150, 0.5)",
  "rgba(0, 79, 150, 0.3)",
];

console.log(myColors.length)

var colorIndex = 0;

    svg.append("g")
        .attr("class", "foreground")
        // .style("cursor", "pointer")
        .style("stroke-opacity", 1)
        .style("stroke", "white")
      .selectAll("path")
        .data(features)
      .enter().append("path")
        // .attr("d", function(d) { 
        //   d.color = null; return path(d); 
        // })
        .attr("d", function(d) { 
          return path(d); 
        })
        .style("fill", function() {
          var tempColor = myColors[colorIndex]
          colorIndex += 1
          return tempColor;
        })

      var pinPath = "M0 -23.55c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z";
      var shadowPath = "M418.208,360.312C375.354,389.774,318.103,406,257,406    c-61.254,0-118.884-16.242-162.273-45.733C52.986,331.898,30,294.868,30,256s22.986-75.898,64.727-104.267    C138.116,122.242,195.746,106,257,106c61.103,0,118.354,16.226,161.208,45.688C459.345,179.97,482,217.015,482,256    S459.345,332.03,418.208,360.312z" 
      // var shadowPath = "M418.208,360.312C375.354,389.774,318.103,406,257,406    c-61.254,0-118.884-16.242-162.273-45.733C52.986,331.898,30,294.868,30,256s22.986-75.898,64.727-104.267    C138.116,122.242,195.746,106,257,106c61.103,0,118.354,16.226,161.208,45.688C459.345,179.97,482,217.015,482,256    S459.345,332.03,418.208,360.312z" 

      var newG = svg.append("g")
        newG.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 10).attr("transform", function() {return "translate(" + projection([-97.6228744,41.8901482]) + ") scale(0.5 0.17 )";}).style("fill", "rgba(0, 0, 0, 0.2)");
        newG.append("path").attr("d", pinPath).attr("transform", function() {return "translate(" + projection([-97.6228744,41.8901482]) + ")";}).style("fill", "white");
        // newG.append("path").attr("d", shadowPath).attr("transform", function() {return "translate(" + projection([-97.6228744,41.8901482]) + ") scale(0.4)";}).style("fill", "rgba(0, 0, 0, 0.2)");

        newG.append("path").attr("d", pinPath).attr("transform", function() {return "translate(" + projection([-100.6228744,41.8901482]) + ")";}).style("fill", "red");
        newG.append("path").attr("d", pinPath).attr("transform", function() {return "translate(" + projection([-87.6228744,41.8901482]) + ")";}).style("fill", "purple");
        newG.append("path").attr("d", pinPath).attr("transform", function() {return "translate(" + projection([-100.6228744,41.8901482]) + ")";}).style("fill", "red");
        newG.append("path").attr("d", pinPath).attr("transform", function() {return "translate(" + projection([-134.5177285,58.2888866]) + ")";}).style("fill", "green");
        newG.append("path").attr("d", pinPath).attr("transform", function() {return "translate(" + projection([-67.140466,44.8138728]) + ")";}).style("fill", "pink");

        // .on("mouseover", function() { this.style.stroke = "black"; })
        // .on("mouseout", function() { this.style.stroke = "none"; })
        // .call(d3.behavior.drag()
        //   .on("dragstart", dragstart)
        //   .on("drag", drag));

    // top.location.hash.split("").slice(1, features.length).forEach(function(c, i) {
    //   if ((c = +c) >= 0 && c < 10) assign(features[i], c ? c - 1 : null);
    // });

    // redraw();

    // function dragstart() {
    //   var feature = d3.event.sourceEvent.target.__data__;
    //   if (assign(feature, dragColor = feature.color === selectedColor ? null : selectedColor)) redraw();
    // }

    // function drag() {
    //   var feature = d3.event.sourceEvent.target.__data__;
    //   if (feature && assign(feature, dragColor)) redraw();
    // }

    // function assign(feature, color) {
    //   if (feature.color === color) return false;
    //   if (feature.color !== null) {
    //     var component = components[feature.color];
    //     component.splice(bisectId(component, feature.id), 1);
    //     feature.color = null;
    //   }
    //   if (color !== null) {
    //     var component = components[color];
    //     component.splice(bisectId(component, feature.id), 0, feature);
    //     feature.color = color;
    //   }
    //   return true;
    // }

    // function redraw() {
    //   merge.data(components).attr("d", function(d) { return path({type: "FeatureCollection", features: d}) || "M0,0"; });
    //   top.history.replaceState(null, null, "#" + features.map(function(d) { return d.color === null ? "0" : d.color + 1; }).join(""));
    // }
  });

  // function clicklegend(d) {
  //   legend[0][selectedColor].style.stroke = null;
  //   legend[0][selectedColor = d].style.stroke = "#000";
  // }

  // function keydown() {
  //   if (d3.event.keyCode >= 48 && d3.event.keyCode < 58) {
  //     var i = d3.event.keyCode - 49;
  //     if (i < 0) i = 10;
  //     clicklegend(i);
  //   }
  // }

  // var pinPath = "M0 -23.55c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"

  d3.select(self.frameElement).style("height", height + "px");
};

{/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg> */}