/*
https://bl.ocks.org/veltman/4c989172ac2f820b0b7267c53cb96975
*/
var user = "tophtucker";

var api = "https://api.lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=43&_embed&per_page=100";

d3.json(api,function(err, posts){

  posts = posts.map(function(gist){
    return gist._embedded["wp:featuredmedia"][0].source_url;
  });

  d3.shuffle(posts);

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

    var next = posts[posts.push(posts.shift()) - 1];

    var side = d3.select(this),
        iframe = side.select("iframe"),
        link = side.select("a");

    link.classed("hidden", false)
      .attr("href", next);

    side.select("iframe")
      .on("load", function() {

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

  function panel() {
    return 'hello world';
  }  

});
