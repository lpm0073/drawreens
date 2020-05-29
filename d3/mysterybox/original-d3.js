var user = "tophtucker";

d3.json("https://api.github.com/users/" + user + "/gists",function(err, gists){

  gists = gists.filter(function(gist){
    return gist.files && gist.files["index.html"];
  }).map(function(gist){
    return "//bl.ocks.org/" + user + "/raw/" + gist.id;
  });

  d3.shuffle(gists);

  var sides = d3.selectAll(".side");

  sides.append("iframe")
    .attr("marginwidth", 0)
    .attr("marginheight", 0)
    .attr("scrolling", "no");

  sides.append("a")
    .attr("class", "hidden")
    .attr("target", "_blank");

  sides.transition()
    .delay(function(d,i){
      return i * 2500;
    })
    .each("end", mystery);

  function mystery() {

    var next = gists[gists.push(gists.shift()) - 1];

    var side = d3.select(this),
        iframe = side.select("iframe"),
        link = side.select("a");

    link.classed("hidden", false)
      .attr("href", next);

    side.select("iframe")
      .on("load",function(){

        d3.select(this)
          .transition()
          .duration(100)
          .style("opacity", 1)
          .transition()
            .delay(Math.random() * 7500 + 7500)
            .duration(100)
            .style("opacity", 0)
            .each("end",function(){

              link.classed("hidden", true)
                .attr("href", null);

              side.transition()
                .delay(3000)
                .each("end", mystery);

            });


      })
      .attr("src", next);

  }

});