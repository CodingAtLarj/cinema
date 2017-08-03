'use strict';

var aboutView = aboutView || {}
aboutView.initAbout = function() {
  $('#movieList').fadeOut()
  $('#userList').fadeOut()
  $('#resultsList').fadeOut()
  $('#resultsButton').hide()
  $('#About_Us').fadeIn()
}
