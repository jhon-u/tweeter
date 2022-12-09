/**
 * Handles the click events for the Newt tweet button in the header and
 * the back-to-top button.
 */

$(document).ready(function() {
  const backToTop = $(".back-to-top");
  backToTop.hide();
  
  // Toggles the Compose Tweet box between hidden and vissible.
  // It also auto focus the text box when visible.
  const toggleForm = function() {
    $(".new-tweet").slideToggle("slow", function() {
      $("#tweet-text").focus();
    });
  };
  
  $(".composer").click(function() {
    return toggleForm();
  });

  // Displays a button at the bottom of the page when the user scrolls down.
  // Hides the button when the user scrolls all the way back to the top.
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      backToTop.fadeIn();
    } else {
      backToTop.fadeOut();
    }
  });
  
  // if the user clicks the button it brings the user back to the top of the page.
  backToTop.click(function() {
    $("html, body").animate({scrollTop : 0},300);
    $(".new-tweet:hidden").show();
  });

});