'use strict';

function getUsers(){
  $.getJSON('/getAllUsers') .then(function(usersjson){
    createUsersList(usersjson);
    console.log(usersjson);
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
    photoContainer.append(`<img id="stylePhoto" src=${userPix.urlphoto}>`)
    photoContainer.attr(`pix-course`, userPix.course)
    frontContainer.append(photoContainer)
  })
  $('body').append(frontContainer)
}
