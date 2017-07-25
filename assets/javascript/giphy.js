// Initial array of gifs
var gifs = ["Funny", "Food", "Movies", "Sad", "Animals"];
// Function for dumping the JSON content for each button into the div
var maxIndex = 10;
function displayGifs() {

	$("#images").empty();
	 var gif = $(this).attr("data-name");
	 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC";

	 $.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function(response) {
	  console.log(response);

	  maxIndex = $(".dropdown").val();


		for(i = 0; i < maxIndex; i++) {

			var rating = $("<p>");
			rating.text("Rating: " + response.data[i].rating.toUpperCase());
			var gifHolder = $("<div>");
			var gif = $("<img>");
			gif.addClass("gif");
			gif.attr("data-animate", response.data[i].images.fixed_height.url);
			gif.attr("data-still", response.data[i].images.fixed_height_still.url);
			gif.attr("data-state", "animate");
			gif.attr("src", response.data[i].images.fixed_height.url);
			gifHolder.addClass("col-md-3 gifHolder center-block text-center");


			console.log(gif);

			$(gifHolder).append(rating);
			$(gifHolder).append(gif);
			$("#images").prepend(gifHolder);
		 
		}
		//add an on click function to each gif that pauses and plays.
		$(".gif").on("click", function() {

	      var state = $(this).attr("data-state");

	      console.log(state);

	      if(state === "still") {
	        var animate = $(this).attr("data-animate");
	        $(this).attr("src", animate);
	        $(this).attr("data-state", "animate");
	      }
	      else {
	        var still = $(this).attr("data-still");
	        $(this).attr("src", still);
	        $(this).attr("data-state", "still");
	      }

		});//end of onclick function
	});//end of ajax all

}//end of display gifs function.


// Function for displaying gif data
function renderButtons() {

	// Looping through the array of movies
	for (var i = 0; i < gifs.length; i++) {
	  // Then dynamicaly generating buttons for each gif in the array
	  // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
	  var btn = $("<button>");
	  // Adding a class of gif to our button
	  btn.addClass("buttons col-md-2");
	  // Adding a data-attribute
	  btn.attr("data-name", gifs[i]);
	  // Providing the initial button text
	  btn.text(gifs[i]);
	  // Adding the button to the buttons-view div
	  $("#buttons-view").prepend(btn);
	}
}

// This function handles events where one button is clicked
$("#add-gif").on("click", function(event) {

	event.preventDefault();
	// Deleting the buttons prior to adding new gifs
	// (this is necessary otherwise you will have repeat buttons)
	$("#buttons-view").empty();
	// This line grabs the input from the textbox
	var newGif = $("#gif-input").val();

	// The gif from the textbox is then added to our array
	gifs.push(newGif);

	// Calling renderButtons which handles the processing of our gif array
	//adds newly input gifs
	renderButtons();

});

// Generic function for displaying the gifInfo
$(document).on("click", ".buttons", displayGifs);


// Calling the renderButtons function to display the intial buttons
renderButtons();








