/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  // loops through tweets
  for (const index in tweets) {
    const tweet = {
      username: tweets[index].user.name,
      avatar: tweets[index].user.avatars,
      handle: tweets[index].user.handle,
      text: tweets[index].content.text,
      createdAt: tweets[index].created_at
    };
    console.log(tweet);
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

// Add comments here
$("document").ready(function() {
  
  // const $button = $(".btn-item");
  // $button.on("submit", function() {
    
  //   console.log("Button clicked, performing ajax call...");
    
  //   $.ajax("more-posts.html", { method: "GET" })
  //     .then(function(morePostsHtml) {
  //       console.log("Success: ", morePostsHtml);
  //       $button.replaceWith(morePostsHtml);
  //     });
  // });
  // Using validation to check for the presence of an input
  $("#form").submit(function(event) {
    event.preventDefault();
    const text = $("#tweet-text").val();

    if (text.length > 140) {

      alert("textLength is too long!");
      // event.preventDefault();
    }
    
    $.ajax({
      url: "/tweets/",
      type: "post",
      data: $("#form").serialize(),
      success: function(data) {
        // ... do something with the data...
        console.log(data);
      }
    });
  });
});

renderTweets(data);a