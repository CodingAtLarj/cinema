'use strict'

getMovies();
getFavorites();
getUsers();

$('#resultsList *').children('img.stylePhoto').addClass('tiny')
$('#userList *').children('img.stylePhoto').addClass('frontPhotos')
$('.overlayPix').fadeIn(3000);
