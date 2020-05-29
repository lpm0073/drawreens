/*
https://bl.ocks.org/veltman/4c989172ac2f820b0b7267c53cb96975
*/
var user = "tophtucker";
var api = "https://api.lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=43&_embed&per_page=100";
var logos = [];

d3.json(api, function(err, posts) {

  logos = posts.map(function(post) {
    return post._embedded["wp:featuredmedia"][0].source_url;
  });

  d3.shuffle(logos);

});

function random_logo() {
  return logos[Math.floor(Math.random() * logos.length)];
}

function repaint() {

  d3.selectAll(".logo")
    .each(function() {

      var side = d3.select(this);
      setTimeout(function() {
          side.style("background-image", "url('" + random_logo() + "')");
        }, 5000*Math.random());   


    });

}

  setTimeout(repaint, 1000);   

