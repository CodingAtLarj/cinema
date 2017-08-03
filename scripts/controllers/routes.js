'use strict';

page('/', function() {
  $('main h2').text('Choose your profile:')

  if ($('#userList').length === 0) {
    getUsers()
  }
  homeView.initHome()
})

page('/results', function() {
  if ($('#resultsList').length === 0) {
    getFavorites()
    $('#resultsButton').css('display', 'none')
  }
  $('main h2').text('These are the results for each movie:')
  resultsView.initResults()
})

page('/about', function() {
  $('main h2').text('About us:')
  aboutView.initAbout()
})

page('/selectMovies', function() {

  if ($('#movieList').length === 0) {
    getMovies()
  }
  $('main h2').text('Pick the movies you like:')
  if (!loadLocalStorage().success) {
    page('/')
  } else {
    initMovies()
    // if (!($('#movieList').length === 0)) {
    $('main').append(`<button type="button" id="resultsButton"><a href="/results">Results</a></button>`)
    // }
  }
})

page('*', homeView.initHome)

page()
