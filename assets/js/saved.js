containerEl = document.querySelector("#saved-artist-container");
titleEl = document.querySelector("#title")

$("#home-button").on("click", function(event){
	document.location.replace("./index.html")
  });


  $("#clear-button").on("click", function(event){
	document.location.replace("./index.html")
  });
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
                newDiv = document.createElement("div");
                newFig = document.createElement("figure");
                newImg = document.createElement("img")
                newLink = document.createElement("a")
                artistImageUrl = savedArtists[i].artistImage
                $(newImg).attr("src", artistImageUrl);
                artistName = savedArtists[i].artistName
                $(newLink).text(artistName);
                artistUrl = savedArtists[i].artistUrl
                $(newLink).attr("href", artistUrl);
                newFig.appendChild(newImg);
                newDiv.appendChild(newFig);
                newDiv.appendChild(newLink);
                containerEl.appendChild(newDiv);
            }
            var clearButton = document.createElement("button")
            $(clearButton).attr("class", "button")
            $(clearButton).attr("id", "clear-button")
            $(clearButton).text("CLEAR SAVED ARTISTS")
            containerEl.appendChild(clearButton);
        }
    }
}

displaySavedArtists()

$("#clear-button").on("click", function(event){
    localStorage.clear()
    location.reload(true);
});

