// Add comments here
$("document").ready(function() {
  
  const $button = $("#load-more-posts");
  $button.on("click", function() {
    console.log("Button clicked, performing ajax call...");
    $.ajax("more-posts.html", { method: "GET" })
      .then(function(morePostsHtml) {
        console.log("Success: ", morePostsHtml);
        $button.replaceWith(morePostsHtml);
      });
  });
});