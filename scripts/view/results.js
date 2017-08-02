'use strict';


function getFavorites(){
  $.getJSON('/getPeopleMoviesFavCount') .then(function(favorites){
    let dictionary = {}
    favorites.forEach(function(favObj){
      let value = dictionary[favObj.movieid] ? dictionary[favObj.movieid] : []
      value.push(favObj.userid)
      dictionary[favObj.movieid] = value
    });
    console.log(dictionary);
  })


}


getFavorites();
// function createResultsList(favorites) {
//   let container = $(document.createElement('div'))
//   let mainContainer = container.clone();
//   mainContainer.attr('id','resultsList');
//   favorites.forEach(function(fav){
//     let favContainer = container.clone();
//
//
// }
