containerEl = document.querySelector("#saved-artist-container");
titleEl = document.querySelector("#title")



function displaySavedArtists(){

    var savedArtistsArray = localStorage.getItem("savedArtists");
    console.log(savedArtistsArray);
    if(!savedArtistsArray){
        $(titleEl).text("No saved artists, go on a quest and find some!");
    }
    else{
        var savedArtists = JSON.parse(savedArtistsArray);
        console.log(savedArtists)
        console.log(savedArtists[0].artistImage)
        if(savedArtists){
            for( i = 0; i < savedArtists.length; i++){
               
                var newFig = document.createElement("figure");
                var newImg = document.createElement("img")
                var newLink = document.createElement("a")
                var artistImageUrl = savedArtists[i].artistImage
                var artistUrl = savedArtists[i].artistUrl
                console.log(artistUrl)
                var artistName = savedArtists[i].artistName
                $(newImg).attr("src", artistImageUrl);
                $(newImg).attr("class", "is-rounded image is-128x128");
                $(newLink).text(artistName);
                $(newLink).attr("href", artistUrl);
                $(newLink).attr("id", "spotify-link");
                $(newLink).attr("class", "button is-small");
                newFig.appendChild(newImg);
                newFig.appendChild(newLink);
                containerEl.appendChild(newFig);
            }
            var clearButton = document.createElement("button")
            $(clearButton).attr("class", "button is-centered")
            $(clearButton).attr("id", "clear-button")
            $(clearButton).text("CLEAR SAVED ARTISTS")
            containerEl.appendChild(clearButton);
        }
    }
}

displaySavedArtists()

$("#clear-button").on("click", function(event){
    localStorage.clear("savedArtists")
    location.reload(true);
});

$( "#begin-button3" ).on( "click", function(event) {
    document.location.replace('./artist.html');
    });

