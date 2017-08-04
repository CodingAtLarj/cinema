'use strict'

function getMovies(){ // eslint-disable-line
  $.getJSON('/get12movies') .then(function(moviesjson){
    $('main').append(createMovieList(moviesjson, 'movieList'));
    favMovies();
  })
}

function createOneMovie(movie) {
  let movieContainer = $(document.createElement('div'))
  movieContainer.attr('class', 'container');
  movieContainer.append(`<h4>${movie.name}</h4>`);
  movieContainer.append(`<img class="movie_pix" src=${movie.urlphoto}>`);
  movieContainer.attr(`data-category`, movie.category);
  movieContainer.attr(`data-movieid`, movie.movieid);
  movieContainer.attr(`data-releasedate`, movie.releasedate);
  movieContainer.data('data', movie);

  let overlayContainer = $(document.createElement('div'))
  overlayContainer.attr('class', 'overlay');
  overlayContainer.append(`Click to Favorite`);
  let favContainer = $(document.createElement('div'))
  favContainer.append(`<i class="fa fa-heart-o text">`);

  overlayContainer.append(favContainer);

  movieContainer.append(overlayContainer);

  return movieContainer
}

function createMovieList(movies, DOMID){
  let mainContainer = $(document.createElement('div'))
  mainContainer.attr('id',DOMID)
  movies.forEach(function(movie){
    mainContainer.append(createOneMovie(movie))
  })
  mainContainer.append(`<button type="button" id="resultsButton"><a href="/results">Results</a></button>`)
  return mainContainer
}

function favMovies() {
  $('.text').on('click', function(event) {
    if($(event.target).hasClass('fa-heart-o')) {
      $(event.target).removeClass('fa-heart-o').addClass('fa-heart');
      $(event.target.parentElement.parentElement).siblings('.movie_pix').fadeTo(0, 0.3);
      if(loadLocalStorage().success) {
        let userid = loadLocalStorage().data.userid
        let parentDiv = $(event.target.parentElement.parentElement.parentElement)
        let movieData = parentDiv.data('data')
        let movieid = movieData.movieid
        if (movieid && userid ) {
          $.ajax({
            url: '/addFavorite',
            type: 'POST',
            headers: {userid,movieid }
          })
        } else {
          console.info('Invalid header. Post request not sent.')
        }
      } else {
        console.info('You are not logged in. How did you get here? :)')
      }
    } else {
      $(event.target).removeClass('fa-heart').addClass('fa-heart-o');
      $(event.target.parentElement.parentElement).siblings('.movie_pix').removeAttr('style');
    }
  });
}


function initMovies() { // eslint-disable-line
  $('#resultsList').fadeOut()
  $('#About_Us').fadeOut()
  $('#userList').fadeOut()
  $('#movieList').fadeIn()
}
