// 0. Global variable declaration
var apiKey = "0r2J0GtSqRoCktl3A01SEFoCffJRRGOT";
var topics = ["Ariana Grande", "Justin Bieber", "Taylor Swift", "Shawn Mendes", "Selena Gomez", "Lorde", "Adele", "Halsey", "Charlie Puth", "Demi Lovato", "Camila Cabello", "Alessia Cara", "Sam Smith", "Ed Sheeran"]; //current pop artists from my brain
var topics1 = ["Ed Sheeran", "Beyonce", "Camila Cabello", "Drake", "Childish Gambino", "Post Malone", "Cardi B", "Maroon 5", "Ariana Grande", "Travis Scott"]; //artists with #1 songs in 2018" https://en.wikipedia.org/wiki/List_of_Billboard_Hot_100_number-one_singles_of_2018
var topics2 = ["Drake", "Post Malone", "Ed Sheeran", "Taylor Swift", "Cardi B", "Imagine Dragons", "BTS", "Bruno Mars", "Camila Cabello", "Migos", "Travis Scott", "Eminem", "Ariana Grande", "Kendrick Lamar", "Maroon 5", "Juice WRLD", "Khalid", "Dua Lipa", "Halsey", "P!nk", "J. Cole", "The Weeknd", "Justin Timberlake", "Sam Smith", "Nicki Minaj"]; //top 25 artists of 2018: https://www.billboard.com/charts/year-end/2018/top-artists

// 1. Generate GIF buttons
function addButton(keyword) { // creates and appends buttons with search keyword passed in
    var $button = $("<button>")
        .addClass("btn gif") // gif class for click event
        .attr("type", "button")
        .attr("data-name", keyword)
        .text(keyword);
    $("#button-display").append($button);
}

for (var i = 0; i < topics2.length; i++) { // loops through pre-existing array to create initial buttons
    addButton(topics2[i]);
}

// 2. Button click events
$(document).on("click", ".gif", giphy);


// 3. Call GIPHY API
function giphy() {
    var search = $(this).data("name"); 
    console.log("You selected: " + search);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        displayImages(response);
    })
}

function displayImages(response) {
    $("#gif-display").empty();

    response.data.forEach(function(image) {
        var $card = $("<div>").addClass("card");
        var $img = $("<img>")
        .attr("src", image.images.original.url)
        .addClass("img-fluid");
        $card.append($img);
        $("#gif-display").append($card);
    });
}
/*
var $card = $("<div>")
.addClass("card");
var $img = $("<img>");

$($img).attr("src", JSON.stringify(response.data[0].images.original.url));

$card.append($img);
$("#gif-display").append($card);
*/

// 4. Display GIFS loop



// 5. User added buttons



// 6. "Add to Favorites" feature