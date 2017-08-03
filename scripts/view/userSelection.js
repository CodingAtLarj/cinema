'use strict';

function getUsers(){
  $.getJSON('/getAllUsers') .then(function(usersjson){
    $('body').append(createUsersList(usersjson,'userList'));
  })
}
getUsers();

function createUsersList(users, DOMID ){
  let userContainer = $(document.createElement('div'))
  let frontContainer = userContainer.clone();
  frontContainer.attr('id',DOMID)
  users.forEach(function(userPix){
    let photoContainer = userContainer.clone();
    photoContainer.append(`<h4>${userPix.name}</h4>`)
    photoContainer.append(`<img class="stylePhoto" src=${userPix.urlphoto}>`)
    photoContainer.attr(`pix-course`, userPix.course)
    photoContainer.attr(`data-course`, userPix.course)
    photoContainer.attr(`data-userid`, userPix.userid)
    photoContainer.data('data', userPix)

    frontContainer.append(photoContainer)
  })
  return frontContainer
}
