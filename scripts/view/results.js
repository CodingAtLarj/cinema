'use strict';

function getFavorites() {
  $.getJSON('/getPeopleMoviesFavCount').then(function(favorites) {
    let dictionary = {}
    favorites.forEach( function(favObj){
      let value = dictionary[favObj.movieid] ? dictionary[favObj.movieid] : []
      value.push(favObj.userid)
      dictionary[favObj.movieid] = value
    })
    createResultsList(dictionary);
  });
}

function createResultsList(dictionary) {
  let container = $(document.createElement('div'))
  let mainContainer = container.clone();
  mainContainer.attr('id','resultsList');
  for(let movieid in dictionary) {
    $.getJSON(`/getMovie/${movieid}`, function(singleMovieArray) {
      let userIds = dictionary[movieid];
      console.log('################MOVIE##########################')
      console.log(singleMovieArray[0].name)
      for(let id of userIds) {
        let data =  $(`#userList div[data-userid=${id}]`).data('data')
        console.log(data)
      }
    })
  }
}

getFavorites();
