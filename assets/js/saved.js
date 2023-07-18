containerEl = document.querySelector("#saved-artist-container");

$("#home-button").on("click", function(event){
	document.location.replace("./index.html")
  });


  $("#clear-button").on("click", function(event){
	document.location.replace("./index.html")
  });
function displaySavedArtists(){

    var savedArtistsArray = localStorage.getItem("savedArtists");
    console.log(savedArtistsArray);
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


    }

}

displaySavedArtists()
