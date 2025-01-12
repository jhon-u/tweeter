/**
 * Fetches tweets from the server using jQuery and AJAX.
 * Loads and render the tweets into the page.
 */

$(document).ready(function() {
  const renderTweets = function(tweets) {
    const sortedData = tweets.sort((a, b) => b.created_at - a.created_at);
    $("#tweets-container").empty().show("slow");

    for (const index in sortedData) {
      const username = sortedData[index].user.name;
      const avatar = sortedData[index].user.avatars;
      const handle = sortedData[index].user.handle;
      const text = sortedData[index].content.text;
      const createdAt = timeago.format(sortedData[index].created_at);

      const tweet = {
        username,
        avatar,
        handle,
        text,
        createdAt
      };

      const tweetElement = createTweetElement(tweet);
      $("#tweets-container").append(tweetElement);
    }
  };
  
  const createTweetElement = function(tweet) {
    let $tweet = `
    <article class="tweet">
      <header>
        <div class="left-box">
          <img src="${tweet.avatar}">
          <div class="tweet-name">
            ${tweet.username}
          </div>
        </div>
        <div class="handle">
          ${tweet.handle}
        </div>
      </header>
      <main>
        <div class="tweet-text">
          
          ${$("<div>").text(tweet.text).html()}
        </div>
        <div class="tweet-divider"></div>
      </main>
      <footer>
        <div>
         ${tweet.createdAt}
        </div>
        <div class="tweet-options">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
          `;
    return $tweet;
  };

  $("#form").keydown(function() {
    $(".form-msg-box").slideUp();
  });

  $("#form").submit(function(event) {
    event.preventDefault();
    const text = $("#tweet-text").val().trim();
    
    if (!text) {
      $(".form-msg-box").slideDown();
      $(".error-msg").text("A blank tweet? Let's try that again by adding some text.");
      return;
    }

    if (text.length > 140) {
      $(".form-msg-box").slideDown();
      $(".error-msg").text("Text must be less than or equal to 140 characters.");
      return;
    }
    
    $.ajax({
      url: "/tweets",
      type: "post",
      data: $("#form").serialize(),
    })
      .done(function() {
        $("#tweet-text").val("");
        $(".counter").text("140");
        loadTweets();
      });
  });

  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" })
      .then(function(data) {
        renderTweets(data);
      });
  };

  loadTweets();

});

