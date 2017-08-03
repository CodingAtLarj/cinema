'use strict'

getMovies();
getFavorites();
getUsers();

$('#resultsList *').children('img.stylePhoto').addClass('tiny')
$('#userList *').children('img.stylePhoto').addClass('frontPhotos')
$('img.stylePhoto').append('<span class=balloon><h1>Hello</h1></span>')
