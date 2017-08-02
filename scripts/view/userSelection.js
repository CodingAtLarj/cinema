'use strict';
$(document).ready(function() {
  $.getJSON('/getAllUsers')
    .then(function(allUsers) {
      allUsers.forEach(function(user){
        // $('#main-action').append(ele);
        console.log(user)
      })
    })
});
