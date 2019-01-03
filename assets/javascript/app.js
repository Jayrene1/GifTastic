// 0. Global variable declaration
var apiKey = "0r2J0GtSqRoCktl3A01SEFoCffJRRGOT";
var topics = ["Ariana Grande", "Justin Bieber", "Taylor Swift", "Shawn Mendes", "Selena Gomez", "Lorde", "Adele", "Halsey", "Charlie Puth", "Demi Lovato", "Camila Cabello", "Alessia Cara", "Sam Smith", "Ed Sheeran"]; //current pop artists from my brain
var topics1 = ["Ed Sheeran", "Beyonce", "Camila Cabello", "Drake", "Childish Gambino", "Post Malone", "Cardi B", "Maroon 5", "Ariana Grande", "Travis Scott"]; //artists with #1 songs in 2018" https://en.wikipedia.org/wiki/List_of_Billboard_Hot_100_number-one_singles_of_2018
var topics2 = ["Drake", "Post Malone", "Ed Sheeran", "Taylor Swift", "Cardi B", "Imagine Dragons", "BTS", "Bruno Mars", "Camila Cabello", "Migos", "Travis Scott", "Eminem", "Ariana Grande", "Kendrick Lamar", "Maroon 5", "Juice WRLD", "Khalid", "Dua Lipa", "Halsey", "P!nk", "J. Cole", "The Weeknd", "Justin Timberlake", "Sam Smith", "Nicki Minaj"]; //top 25 artists of 2018: https://www.billboard.com/charts/year-end/2018/top-artists
var colors = ["#f69e0d", "#83a710", "#027c59", "#008ac2", "#9d4b93", "#fe4e95", "#d02121", "#fc421a"];
var buttonColorsIterator = 0;
var gifColorsIterator = 0;

// 1. Generate GIF buttons
function addButton(keyword) { // creates and appends buttons with search keyword passed in
    var $button = $("<button>")
        .addClass("btn btn-sm gif-btn m-1") // gif class for click event
        .attr("type", "button")
        .attr("data-name", keyword)
        .attr("style", "background-color: " + colors[buttonColorsIterator] + ";")
        .text(keyword);
    $("#button-display").append($button);
    
    if (buttonColorsIterator < (colors.length - 1)) {
        buttonColorsIterator++;
    } else {
        buttonColorsIterator = 0;
    }
}

for (var i = 0; i < topics2.length; i++) { // loops through pre-existing array to create initial buttons
    addButton(topics2[i]);
}

// 2. Button click events
$(document).on("click", ".gif-btn", giphy); // loads gifs
$(document).on("click", ".gif", pause); // pause-play click event for each gif
$(document).on("click", "#add", function(){ // add's user input field as gif button
    addButton($("#add-input").val());
    $("#add-input").val("");
});


// 3. Call GIPHY API
function giphy() {
    var search = $(this).data("name"); 
    console.log("You selected: " + search);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10&rating=y&rating=g&rating=pg";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        displayImages(response);
    })
}

// 4. Display GIFS loop
function displayImages(response) {
    $("#gif-display").empty();

    response.data.forEach(function(image) {
        var $card = $("<div>")
        .addClass("card card-body text-center")
        .attr("style", "background-color: " + colors[gifColorsIterator] + ";")
        var $img = $("<img>")
            .attr("src", image.images.original.url)
            .addClass("img-fluid gif")
            .attr("data-animate", image.images.original.url)
            .attr("data-still", image.images.original_still.url);
        var $rating = $("<small>")
            .addClass("card-text text-muted")
            .text("Rating: " + image.rating.toUpperCase());
        $card.append($img).append($rating);

        $("#gif-display").append($card);

        if (gifColorsIterator < (colors.length - 1)) {
            gifColorsIterator++;
        } else {
            gifColorsIterator = 0;
        }    
    });
}

// 5. Play-Pause feature
function pause() {
    var pauseURL = $(this).data("still");
    var animateURL = $(this).data("animate");
    var imgURL = $(this).attr("src");
    if (pauseURL == imgURL) {
        $(this).attr("src", animateURL);
    } else {
        $(this).attr("src", pauseURL);
    }
}

// 6. "Add to Favorites" feature