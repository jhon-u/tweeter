$(document).ready(function() {
  const backToTop = $(".back-to-top");
  backToTop.hide();
  
  const toggleForm = function() {
    $(".new-tweet").slideToggle("slow", function() {
      $("#tweet-text").focus();
    });
  };
  
  $(".composer").click(function(e) {
    return toggleForm();
  });


  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      backToTop.fadeIn();
    } else {
      backToTop.fadeOut();
    }
  });

  // Scroll back to the top
  backToTop.click(function() {
    $("html, body").animate({scrollTop : 0},300);
    $(".new-tweet:hidden").show();
  });

});