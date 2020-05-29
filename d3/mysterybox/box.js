/*
https://bl.ocks.org/veltman/4c989172ac2f820b0b7267c53cb96975
*/
var user = "tophtucker";

var api = "https://api.lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=43&_embed&per_page=100";

d3.json(api, function(err, posts) {

  posts = posts.map(function(post) {
    retval = post._embedded["wp:featuredmedia"][0].source_url;
    return retval;
  });

  d3.shuffle(posts);

  var sides = d3.selectAll(".logo");
  console.log(sides);

  sides.transition()
    .delay(function(d,i) {
      return i * 2500;
    })
    .each("end", mystery);

  function mystery() {

    var next = posts[posts.push(posts.shift()) - 1];

    var logo_div = d3.select(this);

    background_image = "url('" + next + "')";
    console.log(background_image);

    logo_div.style("background-image", background_image);
    console.log(logo_div);
  }


});
