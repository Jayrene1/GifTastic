// 0. Global variable declaration
var apiKey = "0r2J0GtSqRoCktl3A01SEFoCffJRRGOT";
var topics = ["Drake", "Post Malone", "Ed Sheeran", "Taylor Swift", "Cardi B", "Imagine Dragons", "BTS", "Bruno Mars", "Camila Cabello", "Migos", "Travis Scott", "Eminem", "Ariana Grande", "Kendrick Lamar", "Maroon 5", "Juice WRLD", "Khalid", "Dua Lipa", "Halsey", "P!nk", "J. Cole", "The Weeknd", "Justin Timberlake", "Sam Smith", "Nicki Minaj"]; //top 25 artists of 2018: https://www.billboard.com/charts/year-end/2018/top-artists
    // used by gif buttons (1.) and gif cards (4.)
var colors = ["#f69e0d", "#83a710", "#027c59", "#008ac2", "#9d4b93", "#fe4e95", "#d02121", "#fc421a"]; // color styling for buttons/gifs
var buttonColorsIterator = 0;
var gifColorsIterator = 0;


// 1. Generate GIF buttons
function addButton(keyword) { // creates and appends buttons with search keyword passed in
    var $button = $("<button>")
        .addClass("btn btn-sm gif-btn m-1") // gif class for click event
        .attr("type", "button")
        .attr("data-name", keyword)
        .attr("style", "background-color: " + colors[buttonColorsIterator] + ";") // background color styling
        .text(keyword);
    $("#button-display").append($button);
    
    if (buttonColorsIterator < (colors.length - 1)) { // moves to next color
        buttonColorsIterator++;
    } else {
        buttonColorsIterator = 0;
    }
}

for (var i = 0; i < topics.length; i++) { // loops through pre-existing array to create initial buttons
    addButton(topics[i]);
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
    console.log(queryURL);
    
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
        .attr("style", "background-color: " + colors[gifColorsIterator] + ";") // background color styling
        var $img = $("<img>")
            .attr("src", image.images.original.url)
            .addClass("img-fluid gif")
            .attr("data-animate", image.images.original.url)
            .attr("data-still", image.images.original_still.url);
        var $rating = $("<small>")
            .addClass("card-text")
            .text("Rating: " + image.rating.toUpperCase());
        
        if(favorites.indexOf(image.id) == -1){ // styles favorite icon based on whether it's been favorited before
            var $favorite = $("<i class='far fa-star'></i>")
        } else {
            var $favorite = $("<i class='fas fa-star'></i>")
        }

        $favorite
            .attr("data-id", image.id)
            .attr("style", "color: " + colors[gifColorsIterator] + ";"); // adds fav button with matching color

        $card.append($img).append($rating).append($favorite);

        $("#gif-display").append($card);

        if (gifColorsIterator < (colors.length - 1)) { // moves to next color
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
var favorites = JSON.parse(localStorage.getItem("favorites")); // local array to store id's of favorited gifs

if (!Array.isArray(favorites)) {
    favorites = [];
}

$(document).on("click", '.fa-star', function () {
    $(this).toggleClass('far');     // styles favorite button on click to show solid star
    $(this).toggleClass('fas');     // toggles above style back to regular star
    favorite($(this).attr("data-id")); // calls favorite function and passes in chosen gif's id
});

function favorite(id) { // stores and removes id's of favorited gifs
    console.log("you favorited gif id: " + id);
    console.log("favorites list before: " + favorites);
    
    var index = favorites.indexOf(id);

    if (index == -1) {
        favorites.push(id);
        console.log("favorites list after: " + favorites);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
        favorites.splice(index, 1);
        console.log("removed from favorites: " + favorites);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

}

$("#favorites").on("click", function() { // when favorites button clicked, replaces images with favorites only
    var queryURL = "https://api.giphy.com/v1/gifs?ids=" + favorites + "&api_key=" + apiKey;
    console.log(queryURL);
        
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        displayImages(response);
    })
});
