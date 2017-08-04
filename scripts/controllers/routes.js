'use strict';

function checkCurrentUserMiddleware(ctx, next) {
  if (loadLocalStorage().success) {
    let name = loadLocalStorage().data.name
    $('#logout').text(`${name} logout`)
    $('#logout').show()
  } else {
    $('#logout').hide()
  }
  next()
}
page('/', checkCurrentUserMiddleware, function() {
  $('main h2').text('Choose your profile:')

  if ($('#userList').length === 0) {
    getUsers()
  }
  homeView.initHome()
})

page('/results', checkCurrentUserMiddleware, function() {
  $('#resultsList').remove()
  getFavorites()
  $('main h2').text('Check out who else liked these movies:')
  resultsView.initResults()
})

page('/about', checkCurrentUserMiddleware, function() {
  $('main h2').text('About us:')
  aboutView.initAbout()
})

page('/selectMovies', checkCurrentUserMiddleware, function() {

  if ($('#movieList').length === 0) {
    getMovies()
  }
  $('main h2').text('Pick the movies you like:')
  if (!loadLocalStorage().success) {
    window.location.href = '/'
  } else {
    initMovies()
  }
})

page('*', homeView.initHome)

page()
