'use strict';

page('/', homeView.initHome)

page('/results', resultsView.initResults)

page('/about', aboutView.initAbout)

page('/selectMovies', function(){
  if(!loadLocalStorage().success){
    page('/')
  }else{
    initMovies()
  }
})

page('*', homeView.initHome)

page()
