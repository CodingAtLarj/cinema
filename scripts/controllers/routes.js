'use strict';

page('/', function(){
  if($('#userList').length === 0) {
    getUsers()
  }
  homeView.initHome()
})

page('/results', function(){
  if($('#resultsList').length === 0) {
    getFavorites()
  }
  $('main h2').text('These are the results for each movie:')
  resultsView.initResults()
})

page('/about', function(){
  $('main h2').text('About us:')
  aboutView.initAbout()
})

page('/selectMovies', function(){
  if($('#moviesList').length === 0) {
    getMovies()
  }
  $('main h2').text('Pick the movies you like:')
  if(!loadLocalStorage().success){
    page('/')
  }else{
    initMovies()
  }
})

page('*', homeView.initHome)

page()
