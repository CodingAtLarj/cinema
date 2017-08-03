'use strict';

page('/', function(){
  getUsers()
  homeView.initHome()
})

page('/results', function(){
  getFavorites()
  $('main h2').text('These are the results for each movie:')
  resultsView.initResults()
})

page('/about', function(){
  $('main h2').text('About us:')
  aboutView.initAbout()
})

page('/selectMovies', function(){
  $('main h2').text('Pick the movies you like:')
  getMovies()
  if(!loadLocalStorage().success){
    page('/')
  }else{
    initMovies()
  }
})

page('*', homeView.initHome)

page()
