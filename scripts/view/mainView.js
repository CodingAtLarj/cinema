'use strict'

getMovies();
getFavorites();
getUsers();

$('#resultsList *').children('img.stylePhoto').addClass('tiny')
$('#userList *').children('img.stylePhoto').addClass('frontPhotos')
$('img.stylePhoto').wrap('<div></div>')
