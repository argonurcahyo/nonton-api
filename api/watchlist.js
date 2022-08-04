var router = require('express').Router()
var fire = require('./fire')
var bodyParser = require('body-parser')
const { response } = require('express')
var db = fire.firestore()

router.use(bodyParser.json())

router.get('/', (req, res) => {
  var allData = []
  db.collection('watchlist')
    .get()
    .then(data => {
      data.forEach(doc => {
        allData.push(doc.data())
      })
      console.log(allData)
      return res.json({
        status: 200,
        data: allData
      })
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ error: error })
    })
})

router.get('/movie/:id', (req, res) => {
  db.collection('watchlist')
    .where('id', '==', `${req.params.id}`)
    .get()
    .then(snapshot => {
      if (snapshot) {
        return res.json(snapshot.docs[0].data())
      } else {
        return res.json({ data: "Empty" })
      }
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ error: error })
    })
})

router.post('/movie', (req, res) => {
  const newWatchlist = {
    backdrop_path: req.body.backdrop_path,
    genre_ids: req.body.genre_ids,
    id: req.body.id,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    release_date: req.body.release_date,
    title: req.body.title,
    vote_average: req.body.vote_average,
  }

  db.collection('watchlist')
    .where('id', '==', `${req.params.id}`)
    .get()
    .then(snapshot => {
      if (!snapshot.exists) {
        db.collection('watchlist')
          .add(newWatchlist)
          .then(() => {
            return res.json(newWatchlist)
          })
          .catch(error => {
            console.log(error)
            return res.status(500).json({ error: error.code })
          })
      } else {
        return res.status(500).json({ error: "Duplicate ID" })
      }
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ error: error.code })
    })
})

router.put('/movie/:id', (req, res) => {
  if (req.body.id) {
    res.status(403).json({ message: 'Not allowed to edit' })
  }
  let document = db.collection('watchlist')
    .where('id', '==', `${req.params.id}`)
  document.update(req.body)
    .then(() => {
      res.json({ message: 'Updated !!' })
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ error: error })
    })
})

router.delete('/movie/:id', (req, res) => {
  let document = db.collection('watchlist')
    .where('id', '==', `${req.params.id}`)
  document.get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: '404 not found' })
      }
      return document.delete()

    })
    .then(() => {
      res.json({ message: 'Deleted!' })
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ error: error })
    })
})

module.exports = router