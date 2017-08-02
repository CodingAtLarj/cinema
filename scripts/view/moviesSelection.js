'use strict'

function getMovies(){
  $.getJSON('/get12movies') .then(function(moviesjson){
    createMovieList(moviesjson);
  })
}
getMovies();

function createMovieList(movies){
  let container = $(document.createElement('div'))
  console.log(container);
}
