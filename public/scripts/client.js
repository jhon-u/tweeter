/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$("document").ready(function() {

  const renderTweets = function(tweets) {
    
    // loops through tweets
    for (const index in tweets) {
      const tweet = {
        username: tweets[index].user.name,
        avatar: tweets[index].user.avatars,
        handle: tweets[index].user.handle,
        text: tweets[index].content.text,
        createdAt: timeago.format(tweets[index].created_at)
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
    ${tweet.text}
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
    console.log(event);
    const text = $("#tweet-text").val();

    if (text.length > 140) {
      console.log("textLength is too long!");
    }

    $.ajax({
      url: "/tweets/",
      method: "post",
      data: $("#form").serialize(),
    });
    
    
  });

  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" })
      .then(function(data) {
        console.log("Success: ", data);
        renderTweets(data);
      });
  };

  loadTweets("../server/data-files/initial-tweets.json");

});

