$("document").ready(function() {
  let maxLength = 140;
  $("textarea").on("keyup", function() {
    let tweetLength = maxLength - $(this).val().length;
    if (tweetLength < 0) {
      $(".counter").addClass("counter-negative");
    }
    if (tweetLength >= 0) {
      $(".counter").removeClass("counter-negative");
    }
    $(".counter").text(tweetLength);
  });
});
