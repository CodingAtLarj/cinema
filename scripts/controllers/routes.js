'use strict';

page('/', function(){
  $('main h2').text('Choose your profile:')

  if($('#userList').length === 0) {
    getUsers()
  }
  homeView.initHome()
})

page('/results', function(){
  if($('#resultsList').length === 0) {
    getFavorites()
  }
  $('main h2').text('Check out who else liked those movies:')
  resultsView.initResults()
})

page('/about', function(){
  $('main h2').text('About us:')
  aboutView.initAbout()
})

page('/selectMovies', function(){

  if($('#movieList').length === 0) {
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
