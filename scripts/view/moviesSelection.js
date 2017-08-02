'use strict'

function getMovies(){
  $.getJSON('/get12movies') .then(function(moviesjson){
    createMovieList(moviesjson);
  })
}
getMovies();

function createMovieList(movies){
  let container = $(document.createElement('div'))
  let mainContainer = container.clone();
  mainContainer.attr('id','movieList')
  movies.forEach(function(movie){
    let movieContainer = container.clone();
    movieContainer.append(`<h1>${movie.name}</h1>`)
    movieContainer.append(`<img src=${movie.urlphoto}>`)
    movieContainer.attr(`data-category`, movie.category)
    movieContainer.attr(`data-movieid`, movie.movieid)
    movieContainer.attr(`data-releasedate`, movie.releasedate)
    movieContainer.data('data', movie)
    mainContainer.append(movieContainer)
  })
  $('body').append(mainContainer)
}
