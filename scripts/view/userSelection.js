'use strict';

function getUsers(){
  $.getJSON('/getAllUsers') .then(function(usersjson){
    createUsersList(usersjson);
  })
}
getUsers();

function createUsersList(users){
  let userContainer = $(document.createElement('div'))
  let frontContainer = userContainer.clone();
  frontContainer.attr('id','userList')
  users.forEach(function(userPix){
    let photoContainer = userContainer.clone();
    photoContainer.append(`<h4>${userPix.name}</h4>`)
    photoContainer.append(`<img src=${userPix.urlphoto}>`)
    photoContainer.attr(`data-course`, userPix.course)
    photoContainer.attr(`data-userid`, userPix.userid)
    photoContainer.data('data', userPix)
    frontContainer.append(photoContainer)
  })
  $('body').append(frontContainer)
}
