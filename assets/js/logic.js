var relatedArtistArray = []



//SPOTIFY API CALLS-------------------------------------


//get artist id by name
function artistByName(artistName){
	
	var url= 'https://spotify-scraper.p.rapidapi.com/v1/artist/search?name=' + artistName;
	const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '83780414dbmsh0e3f5dcb76d383ep17b5fdjsnbaa5ebd90548',
		'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
	}
};

fetch(url, options)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
				console.log(data);
				var artistID = data.id;
				console.log(artistID);
				relatedArtists(artistID);
				});
			} else {
				alert('Error: ' + response.statusText);
			}
	});
}

//get artist id from song input and pass to related artist
function songByName(songName){

	var url = 'https://spotify-scraper.p.rapidapi.com/v1/track/search?name=' +songName;
		const options ={
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '83780414dbmsh0e3f5dcb76d383ep17b5fdjsnbaa5ebd90548',
			'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
		}
	}
	fetch(url, options)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                console.log(data);
                artistID = data.artists[0].id;
				relatedArtists(artistID)
                });
            } else {
                alert('Error: ' + response.statusText);
            }
	});
}

//get aritst overview
function artistInfo(artistID){

	var url = 'https://spotify-scraper.p.rapidapi.com/v1/artist/overview?artistId=' + artistID;
		const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '83780414dbmsh0e3f5dcb76d383ep17b5fdjsnbaa5ebd90548',
			'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
		}
	};
	
	fetch(url, options)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
				console.log(data);
        		var artistBio = data.biography
        		console.log("BIO" + artistBio)
	        }); 
		} else {
			alert('Error: ' + response.statusText);
		}
	});

}

//get related artists
function relatedArtists(artistID){

	var url = 'https://spotify-scraper.p.rapidapi.com/v1/artist/related?artistId=' + artistID;
		const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '83780414dbmsh0e3f5dcb76d383ep17b5fdjsnbaa5ebd90548',
            'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
        }
    };
	
	fetch(url, options)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
				console.log(data);
        		for (i = 0; i < 3; i++){
					var relatedArtist = {
        				name: data.relatedArtists.items[i].name,
        				ID: data.relatedArtists.items[i].id,
        			}
					relatedArtistArray.push(relatedArtist)
				}
				var selectedArtist = relatedArtistArray[Math.floor(Math.random() *3)]
				artistInfo(selectedArtist.ID);
				youtubeSearch(selectedArtist.name)
			});
		} else {
			alert('Error: ' + response.statusText);
		}
	});
}


// YOUTUBE API CALL --------------------------------------



//Temporary prompt for testing purposes
//var youSearch = prompt('Youtube search word')
function youtubeSearch(name){
	var url = 'https://youtube-search-results.p.rapidapi.com/youtube-search/?q=' + name + 'artist';
		const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '83780414dbmsh0e3f5dcb76d383ep17b5fdjsnbaa5ebd90548',
			'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
		}
	};

	fetch(url, options)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
					console.log(data);
					for(i = 0; i < 3; i++){
						if(data.items[i].type = "video"){
							var urlVideo = data.items[i].url;
							console.log(urlVideo);
							var thumbnail = data.items[i].bestThumbnail.url
							console.log(thumbnail)
						}
					}
				});
			} else {
				alert('Error: ' + response.statusText);
			}
		});
}

//-----------------LOGIC FOR MODALS------------------------//
document.addEventListener('DOMContentLoaded', () => {
	// Functions to open and close a modal
	function openModal($el) {
	  $el.classList.add('is-active');
	}
  
	function closeModal($el) {
	  $el.classList.remove('is-active');
	}
  
	function closeAllModals() {
	  (document.querySelectorAll('.modal') || []).forEach(($modal) => {
		closeModal($modal);
	  });
	}
  
	// Add a click event on buttons to open a specific modal

	//artist modal
	(document.querySelectorAll('.artist-modal-trigger') || []).forEach(($trigger) => {
	  const modal = $trigger.dataset.target;
	  const $target = document.getElementById(modal);
  
	  $trigger.addEventListener('click', () => {
		openModal($target);
	  });
	});

	//song modal
	(document.querySelectorAll('.song-modal-trigger') || []).forEach(($trigger) => {
		const modal = $trigger.dataset.target;
		const $target = document.getElementById(modal);
	
		$trigger.addEventListener('click', () => {
		  openModal($target);
		});
	  });
  
	// Add a click event on various child elements to close the parent modal
	(document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
	  const $target = $close.closest('.modal');
  
	  $close.addEventListener('click', () => {
		closeModal($target);
	  });
	});
  
	// Add a keyboard event to close all modals
	document.addEventListener('keydown', (event) => {
	  const e = event || window.event;
  
	  if (e.keyCode === 27) { // Escape key
		closeAllModals();
	  }
	});
  });
//----------- Logic for getting user input and passing it to respective function--------------//
  
$( "#artist-search" ).on( "click", function(event) {
    
	var artistInput = document.getElementById("artist-input").value.trim();
	console.log(artistInput);
	artistByName(artistInput)
  });


$( "#song-search" ).on( "click", function(event) {
    
	var songInput = document.getElementById("song-input").value.trim()
	console.log(songInput);
	songByName(songInput)
  });




