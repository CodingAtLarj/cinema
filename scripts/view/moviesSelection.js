'use strict'

function getMovies(){
  $.getJSON('/get12movies') .then(function(moviesjson){
    moviesjson.forEach(function(movie){
      console.log(movie);
    })
  })
}
getMovies();
