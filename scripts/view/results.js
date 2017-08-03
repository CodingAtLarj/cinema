'use strict';

<<<<<<< HEAD

function getFavorites() {
  $.getJSON('/getPeopleMoviesFavCount').then(function(favorites) {
    let dictionary = {}
    let value = dictionary[favObj.movieid] ? dictionary[favObj.movieid] : []
    value.push(favObj.userid)
    dictionary[favObj.movieid] = value
  });
  createResultsList(dictionary);
=======
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

function createHTMlforMovieResults(singleMovieArray, users) {
  let container = $(document.createElement('div'))
  let usersDIV = createUsersList(users, '' )
  let movieDIV = createMovieList(singleMovieArray, '')

  container.append(movieDIV)
  container.append(usersDIV)
  return container
>>>>>>> 782e15805c23870382c87a76228ba7223a3ba572
}

function createResultsList(dictionary) {
  let mainContainer = $(document.createElement('div'))
  mainContainer.attr('id','resultsList');
  $('body').append(mainContainer);
  for(let movieid in dictionary) {
    $.getJSON(`/getMovie/${movieid}`, function(singleMovieArray) {
      let users =  (dictionary[movieid]).map(id => {
        return $(`#userList div[data-userid=${id}]`).data('data')
      })
      $('#resultsList').append(createHTMlforMovieResults(singleMovieArray, users))
    })
  }
}


getFavorites();
<<<<<<< HEAD

function createResultsList(dictionary) {
  let container = $(document.createElement('div'))
  let mainContainer = container.clone();
  mainContainer.attr('id','resultsList');
  for(let movieid in dictionary) {
    let userIds = dictionary[movieid]
  }




}
=======
>>>>>>> 782e15805c23870382c87a76228ba7223a3ba572
