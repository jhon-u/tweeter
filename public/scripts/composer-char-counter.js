/**
 * Changes the value of the Character Counter to show how many characters
 * a user may still type (subtracting the number of characters they've
 * typed from the maximum allowable character count of 140).
 * It also changes the color of the counter to red if the character counter is negative.
 */

$("document").ready(function() {
  let maxLength = 140;
  $("textarea").on("keyup", function() {
    let tweetLength = maxLength - $(this).val().length;
    const counter = $(".counter");
    if (tweetLength < 0) {
      counter.addClass("counter-negative");
    }
    if (tweetLength >= 0) {
      counter.removeClass("counter-negative");
    }
    counter.text(tweetLength);
  });
});
