'use strict';

function getUsers(){
  $.getJSON('/getAllUsers') .then(function(usersjson){
    $('body').append(createUsersList(usersjson,'userList'));
    selectUserHandler()
  })
}


function createUsersList(users, DOMID ){
  let userContainer = $(document.createElement('div'))
  let frontContainer = userContainer.clone();
  frontContainer.attr('id',DOMID)
  users.forEach(function(userPix){
    let photoContainer = userContainer.clone();
    photoContainer.append(`<img class="stylePhoto" src=${userPix.urlphoto}>`)
    photoContainer.attr(`data-course`, userPix.course)
    photoContainer.attr(`data-userid`, userPix.userid)
    photoContainer.data('data', userPix)
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
      localStorage.setItem('currentUser', JSON.stringify(currentUserData))
    } else {
      console.info('You are already logged in')
    }
    $('#userList').hide()
    $('#movieList').show()
  });
}
