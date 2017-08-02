# cinema
Movie reviews

# Backend API

## POST /addFavorite

You need to send two headers keys value pair:

`userid` : databaseIDValue  
`movieid` : databaseIDValue

## GET /getPeopleMoviesFavCount

This gives you a list of userids, movieid and count of the times a user have liked a movie.

http://localhost/getPeopleMoviesFavCount

Sample Response:
```json
[
  {
    "userid": 1,
    "movieid": 19,
    "count": "1"
  },
  {
    "userid": 2,
    "movieid": 19,
    "count": "1"
  }
]

```
## GET /getUserFavorites

This gets the table favorites from the  server.

http://localhost/getUserFavorites

```json
[
  {
    "id": 23,
    "userid": 1,
    "movieid": 19,
    "dateliked": "2017-08-02T07:00:00.000Z"
  },
  {
    "id": 24,
    "userid": 2,
    "movieid": 19,
    "dateliked": "2017-08-02T07:00:00.000Z"
  },
  {
    "id": 27,
    "userid": 3,
    "movieid": 19,
    "dateliked": "2017-08-02T07:00:00.000Z"
  }
]
```

## GET /getAllUsers

```json
[
  {
    "userid": 3,
    "urlphoto": "https:\/\/avatars.slack-edge.com\/2017-06-04\/192597667269_10ddb6c3e4cc4fc82ad3_original.jpg",
    "name": "Ashwini Rao",
    "course": "seattle-301d27"
  },
  {
   "userid": 16,
   "urlphoto": "https:\/\/secure.gravatar.com\/avatar\/8d9dbc0dfeb74eab8dd9bbd9cbd84680.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0003-512.png",
   "name": "Jose Cheyo Jimenez",
   "course": "seattle-301d27"
 }
]
```
## GET /get12movies

```json

[
  {
    "movieid": 19,
    "category": "Now Playing",
    "name": "The Dark Tower",
    "releasedate": "2017-08-03T07:00:00.000Z",
    "urlphoto": "https:\/\/image.tmdb.org\/t\/p\/w500\/i9GUSgddIqrroubiLsvvMRYyRy0.jpg"
  },
  {
    "movieid": 13,
    "category": "Now Playing",
    "name": "The Emoji Movie",
    "releasedate": "2017-07-28T07:00:00.000Z",
    "urlphoto": "https:\/\/image.tmdb.org\/t\/p\/w500\/fvr5etD00qupuL0YcTVfz8msJCa.jpg"
  }
]

```
