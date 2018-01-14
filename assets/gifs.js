//Topics Array
var topics = ["bananas","apples","mango","coconut","zoolander"];

// loop through topics and append buttons
function renderTopics() {
  for (var i = 0; i < topics.length; i++) {
    var topicButton = "<button data-topic='" + topics[i] + "' class='topic btn btn-info text-light font-weight-bold m-1'>" + topics[i] + "</button>";
    $(".topic-area").append(topicButton);
  }
}

//Adding topics with search button
$("body").on("click",".search-button", function(event){
  $('.topic-area').empty();
  event.preventDefault();
  var newTopic = $(".search-text").val().trim()
  topics.push(newTopic);
  renderTopics();
});

renderTopics();

//generate gifs when clicking a topic
$("body").on("click",".topic", function() {
  $(".gif-area").empty();
  var topic = $(this).attr("data-topic");
  var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=cwqGZR3Hs8Ttymldi6pfTTlEzktawR7F&q=" + topic + "&limit=10&offset=0&rating=G&lang=en";
  $.ajax({
    url: giphyURL,
    method: 'GET'
  }).done(function(response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class= 'float-left m-2'>");
        var rating = results[i].rating;
        var ratingDiv = $("<p>").text("Rating: " + rating);
        var topicImage = $("<img>");
        topicImage.attr("src", results[i].images.fixed_height_still.url);
        topicImage.attr("data-pause", results[i].images.fixed_height_still.url);
        topicImage.attr("data-play", results[i].images.fixed_height.url);
        topicImage.attr("data-state", "still");
        gifDiv.append(ratingDiv);
        gifDiv.append(topicImage);
        $(".gif-area").append(gifDiv);
    }
  });
});

//play and pause gifs
$("body").on("click", "img", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-play"));
    $(this).attr("data-state", "play");
  } else {
    $(this).attr("src", $(this).attr("data-pause"));
    $(this).attr("data-state", "still")
  }
});
