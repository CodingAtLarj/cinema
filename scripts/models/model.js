'use strict';

class User { // eslint-disable-line
  constructor(userid, urlphoto, name, course){
    this.userid = userid,
    this.urlphoto = urlphoto,
    this.name = name,
    this.course = course
  }
}

class Movie { // eslint-disable-line
  constructor(movieid, category, name, releasedate, urlphoto) {
    this.category = category,
    this.name = name,
    this.releasedate = releasedate,
    this.movieid = movieid,
    this.urlphoto = urlphoto
  }
}
