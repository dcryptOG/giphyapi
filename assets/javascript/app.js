$(document).ready(function () {

    //array for adding giphy button

    var topics = ["Puppy", "Kitten", "Penguin", "Giraffe", "Bear", "Blue Whale", "Otter"];

    //function GET attributes to display on DOM using Giphy API and JSON

    function displayInfo() {
      var animal = $(this).attr("animal-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=ngH9lc0v78v1lu9C4Ov2ftYhCwzhCwIN&limit=10";

      //use AJAX to GET method on Animal Button click

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function (response) {

        //empty animals div. New selection appends to emtpy div - do not want previous searches listed

        $("#animals").empty();

        var results = response.data;

        //Add user animal bro for the gif button added
        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class='useranimal'>");

          //variable for rating & appending
          var rating = results[i].rating;
          var pRate = $("<p>").text("Rating: " + rating);

          //variables for still & fixed size gif
          var urlStill = results[i].images.fixed_height_still.url;
          var urlPlay = results[i].images.fixed_height.url;

          //gif needs still source to load, and data attributes to store the still and animated gifs for pausing function
          var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

          //append the gif and rating to the new div created during for loop
          animalDiv.append(gif);
          animalDiv.append(pRate);

          //append all for loop created divs to the DOM
          $("#animals").append(animalDiv);
        }

        //on click play & pause gif.
        $(".gif").on("click", function () {
          var state = $(this).attr("data-state");

          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }

        });
      });
    }
    //create buttons from topics array indexes - gets information from JSON
    function renderButtons() {

      //delete original array of buttons everytime renders so they do not keep repeating
      $("#button-view").empty();

      //loop through array
      for (var i = 0; i < topics.length; i++) {
        var animalRender = $("<button>");

        //add class and attribute of name so display function knows what to GET.
        animalRender.addClass("animal");
        animalRender.attr("animal-name", topics[i]);
        animalRender.text(topics[i]);
        $("#button-view").append(animalRender);
      }
    }

    //on click event to add an additional animal button when submitted - push input to array.
    $("#add-animal").on("click", function (event) {
      event.preventDefault();
      var animal = $("#animal-input").val().trim();

      //push user input to original topics array & rerun render of buttons to show newly added button.
      topics.push(animal);
      $("#animal-input").val(" ");
      renderButtons();
    });

    //on click entire document to cover all elements w/ class "animal" & run displayInfo function
    $(document).on("click", ".animal", displayInfo);

    //run function to display all buttons on startup
    renderButtons();
  });