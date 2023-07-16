//general functions

function artistNameGetter(){ 
	
	var artistName = prompt("Enter artist name");

	artistByName(artistName);
	youtubeSearch(artistName);

}

function songNameGetter(){
	
	var songName = prompt("enter song name");
    if(songName){
	songByName(songName);
    }
    
}


//SPOTIFY API CALLS-------------------------------------


//get artist id by name
function artistByName(artistName){


var settings = {
	async: true,
	crossDomain: true,
	url: 'https://spotify-scraper.p.rapidapi.com/v1/artist/search?name=' + artistName,
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '83780414dbmsh0e3f5dcb76d383ep17b5fdjsnbaa5ebd90548',
		'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (data) {
	console.log(data);
	var artistID = data.id;
	console.log(artistID);
	artistInfo(artistID)
	relatedArtists(artistID);

});
}

//song id and youtube info by name from nameGetter
function songByName(songName){

var settings = {
	async: true,
	crossDomain: true,
	url: 'https://spotify-scraper.p.rapidapi.com/v1/track/download?track=' + songName,
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '83780414dbmsh0e3f5dcb76d383ep17b5fdjsnbaa5ebd90548',
		'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (data) {
	console.log(data);
    var searchTerm = data.youtubeVideo.searchTerm;

    //TO DO: call function to get artist based on song id
    youtubeSearch(searchTerm)



});
}

//get aritst overview
function artistInfo(artistID){

	const settings = {
		async: true,
		crossDomain: true,
		url: 'https://spotify-scraper.p.rapidapi.com/v1/artist/overview?artistId=' + artistID,
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '83780414dbmsh0e3f5dcb76d383ep17b5fdjsnbaa5ebd90548',
			'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
		}
	};
	
	$.ajax(settings).done(function (data) {
		console.log(data);
        var artistBio = data.biography
        console.log("BIO" + artistBio)
	});

}

//get related artists
function relatedArtists(artistID){

	const settings = {
        async: true,
        crossDomain: true,
        url: 'https://spotify-scraper.p.rapidapi.com/v1/artist/related?artistId=' + artistID,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '83780414dbmsh0e3f5dcb76d383ep17b5fdjsnbaa5ebd90548',
            'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
        }
    };
	
	$.ajax(settings).done(function (data) {
		console.log(data);
        for (i = 0; i < 3; i++){
            var relatedArtist = data.relatedArtists.items[i].name;
            console.log("Related Artist: " +relatedArtist)
            var relatedArtistID = data.relatedArtists.items[i].id;
            console.log('ID: ' + artistID);
        }
          
            
	});

}


// YOUTUBE API CALL --------------------------------------



//Temporary prompt for testing purposes
//var youSearch = prompt('Youtube search word')
function youtubeSearch(name){
var apiUrl =   'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=' + name + '&key=AIzaSyCgUCwJgAvz6ez56K1___znCggahrX9jtg'  


  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        let videos = data.items;
        let videoContainer = document.querySelector(".youtube-container");
        for (i = 0; i < videos.length; i++){
          
          imgUrl = videos[i].snippet.thumbnails.default.url
          console.log(imgUrl);
         // videoContainer.innerHTML = '<img src ="${videos.snippet.thumbnails.high.url}>"'
        }
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });

}

//artistByName()
artistNameGetter();
songNameGetter();