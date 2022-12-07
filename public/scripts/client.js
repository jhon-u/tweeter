/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$("document").ready(function() {

  const renderTweets = function(tweets) {
    console.log(tweets);
    const sortedData = tweets.sort((a, b) => b.created_at - a.created_at);
    // loops through tweets
    for (const index in sortedData) {
      const tweet = {
        username: sortedData[index].user.name,
        avatar: sortedData[index].user.avatars,
        handle: sortedData[index].user.handle,
        text: sortedData[index].content.text,
        createdAt: timeago.format(sortedData[index].created_at)
      };
      // calls createTweetElement for each tweet
      const tweetElement = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
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
    ${$("<div>").text(tweet.text)}
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
          `;/* Your code for creating the tweet element */
    // ...
    return $tweet;
  };

  $("#form").submit(function(event) {
    event.preventDefault();
    const text = $("#tweet-text").val();
    
    if (!text.trim()) {
      alert("No text to display");
      return;
    }

    if (text.length > 140) {
      alert("textLength is too long!");
      return;
    }

    console.log("SERIALIZED: ", $("<div>").text($("#form").serialize()));

    $.ajax({
      url: "/tweets",
      type: "post",
      data: $("#form").serialize(),
    })
      .done(function() {
        $("#tweet-text").val("");
        loadTweets();
      });
  });
    
  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" })
      .then(function(data) {
        $("#tweets-container").empty();
        renderTweets(data);
      });
  };

  loadTweets();

});

