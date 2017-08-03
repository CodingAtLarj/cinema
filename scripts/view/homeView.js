'use strict';

let homeView = {}
homeView.initHome = function() {
  $('#movieList').fadeOut()
  $('#resultsList').fadeOut()
  $('#About_Us').fadeOut()
  $('#resultsButton').hide()
  $('#userList').fadeIn()
}
