'use strict'

function getMovies(){
  $.getJSON('/get12movies') .then(function(moviesjson){
    $('body').append(createMovieList(moviesjson, 'movieList'));
  })
}
getMovies();

function createMovieList(movies, DOMID){
  let container = $(document.createElement('div'))
  let mainContainer = container.clone();
  mainContainer.attr('id',DOMID)
  movies.forEach(function(movie){
    let movieContainer = container.clone();
    movieContainer.append(`<h1>${movie.name}</h1>`)
    movieContainer.append(`<img class="movie_pix" src=${movie.urlphoto}>`)
    movieContainer.attr(`data-category`, movie.category)
    movieContainer.attr(`data-movieid`, movie.movieid)
    movieContainer.attr(`data-releasedate`, movie.releasedate)
    movieContainer.data('data', movie)
    mainContainer.append(movieContainer)
  })
  return mainContainer
}
