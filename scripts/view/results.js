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

function createHTMlforMovieResults(singleMovieArray, users) {
  let container = $(document.createElement('div'))
  let usersDIV = createUsersList(users, '' )
  let movieDIV = createMovieList(singleMovieArray, '')

  container.append(movieDIV)
  container.append(usersDIV)
  return container
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

