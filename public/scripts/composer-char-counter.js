$(document).ready(function(e) {
  let maxLength = 140;
  $("textarea").on("keyup", function() {
    let tweetLength = maxLength - $(this).val().length;
    $(".counter").text(tweetLength);
  });
});
