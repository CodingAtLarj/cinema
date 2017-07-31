'use strict';

class User {
  constructor(userid, urlphoto, name, course){
    this.userid = userid,
    this.urlphoto = urlphoto,
    this.name = name,
    this.course = course
  }
}

class Movie {
  constructor(categorie, name, releasedate, movieid, photo) {
    this.categorie = categorie,
    this.name = name,
    this.releasedate = releasedate,
    this.movieid = movieid,
    this.photo = photo
  }
}
