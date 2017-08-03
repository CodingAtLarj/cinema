'use strict';

var app = app || {};

(function(module) {

  var homeView = {};
  homeView.initHome = function() {
    $('.aboutMe').fadeOut();
    $('#repos').fadeOut();
    $('article').fadeOut();
    $('#userList').fadeIn();
  }

  module.homeView = homeView;
})(app);
