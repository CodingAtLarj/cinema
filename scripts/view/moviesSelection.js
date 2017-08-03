'use strict'

function getMovies(){
  $.getJSON('/get12movies') .then(function(moviesjson){
    $('body').append(createMovieList(moviesjson, 'movieList'));
    favMovies();
  })
}

function createMovieList(movies, DOMID){
  let container = $(document.createElement('div'))
  let mainContainer = container.clone();
  mainContainer.attr('id',DOMID)
  movies.forEach(function(movie){
    let movieContainer = container.clone();
    movieContainer.attr('class', 'container');
    movieContainer.append(`<h4>${movie.name}</h4>`);
    movieContainer.append(`<img class="movie_pix" src=${movie.urlphoto}>`);
    movieContainer.attr(`data-category`, movie.category);
    movieContainer.attr(`data-movieid`, movie.movieid);
    movieContainer.attr(`data-releasedate`, movie.releasedate);
    movieContainer.data('data', movie);

    let overlayContainer = container.clone();
    overlayContainer.attr('class', 'overlay');
    overlayContainer.append(`Click to Favorite`);
    let favContainer = container.clone();
    favContainer.append(`<i class="fa fa-heart-o text">`);

    overlayContainer.append(favContainer);

    movieContainer.append(overlayContainer);

    mainContainer.append(movieContainer)
  })
  return mainContainer
}

function favMovies() {
  $('.text').on('click', function(event) {
    if($(event.target).hasClass('fa-heart-o')) {
      $(event.target).removeClass('fa-heart-o').addClass('fa-heart');
      // TODO: Add to favorites table
    } else {
      $(event.target).removeClass('fa-heart').addClass('fa-heart-o');
      // TODO: Remove from favorites table
    }
  });
}
