# cinema
cinema is a movie 'likes' app. Each quarter a new  group of eager students become CodeFellow 301 cohorts. Although there are plenty of opportunities to pair program, it still takes awhile for students to get to know one another. Our app is designed to hasten the 'getting to know you' process by providing movie common interest data that can be used as an ice breaking and social activity tool.
# about us
## Jose Cheyo Jimenez
Jose has come full circle back to Software Engineering. He has a broad technical background that includes web development, video editing, digital production, photography, cinematography, 3d artistry and  project management. Programing has always been an enjoyable hobby for Jose and he is excited to make it part of his career. Jose is mostly interested in mobile development using modern languages

## Ashwini Rao
Ashwini has a bachelor’s degree in Electronics and Communication engineering and worked as a Lead engineer for an electronics device manufacturing company in India before she went on to get a Master’s degree in Networking and communication. She is excited to be a part of the Apprenti program and looking forward to starting a career as a software developer Apprentice at Microsoft.
## Rami Bououni
Rami is 32-years-old and originally from Tunisia. He have an associate degree in Information and Telecommunication Systems, and right now he is learning to code here at Code Fellows and super excited to be on his way to start working at Microsoft.
## La Januari
La has programming experience in Ruby, Python and JavaScript and loves problem-solving. She is very excited to embark on a new career and is looking forward to life at Microsoft.

# TECHNICAL REQUIREMENTS
## Link to Depoloyed Site:

  https://codeflicks.herokuapp.com/

## External API
    Slack API:
    https://api.slack.com/

    The Movie Database API:
    https://developers.themoviedb.org/

# Backend API

### Deploy a heroku or similar site

You will need these environment variables:

* DATABASE_URL
* MOVIEDBTOKEN
* SLACKTOKEN
* CLASSNAME

Class name is the channel name as it appears in slack.


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
