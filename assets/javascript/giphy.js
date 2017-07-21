// Initial array of food
var foods = ["Funny", "Food", "Movies", "Sad", "Animals"];


// Function for dumping the JSON content for each button into the div
function displayGifs() {
$(".gif").empty();
 var food = $(this).attr("data-name");
 var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=dc6zaTOxFJmzC";
// YOUR CODE GOES HERE!!! HINT: You will need to create a new div to hold the JSON.
 $.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
  console.log(response);


for(i = 0; i < 10; i++) {

	var div = $("<div>");
	var rating = $("<h2>Rating: " + response.data[i].rating + "</h2>");

	var gif = $("<img>");
	gif.attr("src", response.data[i].images.fixed_height.url);
	console.log(gif);
	$(gif).css({
		'height' : '300px',
/*		'float' : 'left',*/
		'margin' : '30px'
	});

	$(gif).on("click", function() {
		var click = true;

		if(click == false) {
			gif.attr("src", response.data[i].images.fixed_height.url);
			click = true;
		}
		else {
			gif.attr("src", response.data[i].images.fixed_height_still.url);
			click = true;
		}

	})


	rating.appendTo(div);
	gif.appendTo(div);

	div.appendTo(".gif");

}



}); 
}

// Function for displaying movie data
function renderButtons() {

// Deleting the buttons prior to adding new movies
// (this is necessary otherwise you will have repeat buttons)
$("#buttons-view").empty();

// Looping through the array of movies
for (var i = 0; i < foods.length; i++) {

  // Then dynamicaly generating buttons for each movie in the array
  // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
  var a = $("<button>");
  // Adding a class of movie to our button
  a.addClass("giphy");
  // Adding a data-attribute
  a.attr("data-name", foods[i]);
  // Providing the initial button text
  a.text(foods[i]);
  // Adding the button to the buttons-view div
  $("#buttons-view").append(a);
}
}

// This function handles events where one button is clicked
$("#add-gif").on("click", function(event) {

event.preventDefault();

// This line grabs the input from the textbox
var food = $("#gif-input").val().trim();

// The movie from the textbox is then added to our array
foods.push(food);

// Calling renderButtons which handles the processing of our movie array
renderButtons();

});

// Generic function for displaying the movieInfo
$(document).on("click", ".giphy", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();