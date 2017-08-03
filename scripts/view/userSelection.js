'use strict';

function getUsers(){
  $.getJSON('/getAllUsers') .then(function(usersjson){
    $('main').append(createUsersList(usersjson,'id','userList'));
    selectUserHandler()
  })
}


function createUsersList(users,attributeType,DOMID){
  let userContainer = $(document.createElement('div'))
  let frontContainer = userContainer.clone();
  frontContainer.attr(attributeType, DOMID)
  users.forEach(function(userPix){
    let photoContainer = userContainer.clone();
    photoContainer.append(`<img class="stylePhoto" src=${userPix.urlphoto}>`)
    photoContainer.attr(`data-course`, userPix.course)
    photoContainer.attr(`data-userid`, userPix.userid)
    photoContainer.data('data', userPix)
    let overlayContainer = userContainer.clone()
    overlayContainer.addClass('overlayPix')
    photoContainer.addClass('container')
    overlayContainer.append(userPix.name)
    photoContainer.append(overlayContainer)
    frontContainer.append(photoContainer)
  })
  return frontContainer
}

function selectUserHandler() {
  $('#userList div').on('click', function(event) {
    if(!$(event.target).hasClass('.currentUser')){
      $('#userList div').removeClass('currentUser')
      $(this).addClass('currentUser')
      let currentUserData = $(this).data('data')
      saveLocalStorage(currentUserData)
    } else {
      console.info('You are already logged in')
    }
    page('/selectMovies')

  });
}
