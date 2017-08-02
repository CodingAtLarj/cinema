'use strict';


function getFavorites() {
  $.getJSON('/getPeopleMoviesFavCount').then(function(favorites) {
    let dictionary = {}
    let value = dictionary[favObj.movieid] ? dictionary[favObj.movieid] : []
    value.push(favObj.userid)
    dictionary[favObj.movieid] = value
  });
  createResultsList(dictionary);
}



getFavorites();

function createResultsList(dictionary) {
  let container = $(document.createElement('div'))
  let mainContainer = container.clone();
  mainContainer.attr('id','resultsList');
  for(let movieid in dictionary) {
    let userIds = dictionary[movieid]
  }




}
