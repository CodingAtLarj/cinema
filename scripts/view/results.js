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
  let usersDIV = createUsersList(users,'class','usersWhoLikeMovies' )
  let movieDIV = createOneMovie(singleMovieArray[0])
  container.attr('class','moviesLiked')
  container.append(movieDIV)
  container.append(usersDIV)
  return container
}

function createResultsList(dictionary) {
  let mainContainer = $(document.createElement('div'))
  mainContainer.attr('id','resultsList');
  $('main').append(mainContainer);
  let movieIdorder = []
  for(let movieid in dictionary) {
    let order = (dictionary[movieid]).length
    movieIdorder.push({movieid, order})
  }
  movieIdorder.sort((a, b) => {
    let left = parseInt(a.order, 10)
    let right = parseInt(b.order, 10)
    return left === right ? 0 : a.order > right ? -1 : 1
  })

  movieIdorder.map(idorder => idorder.movieid)
    .forEach(movieid => {
      $.getJSON(`/getMovie/${movieid}`, function(singleMovieArray) {
        let users =  (dictionary[movieid]).map(id => {
          return $(`#userList div[data-userid=${id}]`).data('data')
        })
        $('#resultsList').append(createHTMlforMovieResults(singleMovieArray, users))
      })
    })
}
