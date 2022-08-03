var router = require('express').Router()
var fire = require('./fire')
var bodyParser = require('body-parser')
var db = fire.firestore()

router.use(bodyParser.json())

router.get('/', (req, res) => {
  var allData = []
  db.collection('watchlist').get()
    .then(snapshot => {
      snapshot.forEach(hasil => {
        allData.push(hasil.data())
      })
      console.log(allData)
      res.send({ data: allData })
    }).catch(error => {
      console.log(error)
    })
})

router.post('/', (req, res) => {
  db.collection('watchlist').add({
    backdrop_path: req.body.backdrop_path,
    genre_ids: req.body.genre_ids,
    id: req.body.id,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    release_date: req.body.release_date,
    title: req.body.title,
    vote_average: req.body.vote_average,
  })
  res.send({
    backdrop_path: req.body.backdrop_path,
    genre_ids: req.body.genre_ids,
    id: req.body.id,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    release_date: req.body.release_date,
    title: req.body.title,
    vote_average: req.body.vote_average,
  })
})

module.exports = router