var router = require('express').Router()
var fire = require('./fire')
var bodyParser = require('body-parser')
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
      return res.json({
        status: 200,
        count: allData.length,
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
    .where('id', '==', parseInt(req.params.id))
    .get()
    .then(snapshot => {
      if (snapshot.docs.length > 0) {
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
    backdrop_path: req.body.backdrop_path ? req.body.backdrop_path : '',
    genre_ids: req.body.genre_ids ? req.body.genre_ids : [],
    id: req.body.id ? req.body.id : '',
    overview: req.body.overview ? req.body.overview : '',
    poster_path: req.body.poster_path ? req.body.poster_path : '',
    release_date: req.body.release_date ? req.body.release_date : '',
    title: req.body.title ? req.body.title : '',
    vote_average: req.body.vote_average ? req.body.vote_average : '',
  }

  db.collection('watchlist')
    .where('id', '==', `${req.body.id}`)
    .get()
    .then(snapshot => {
      if (snapshot.docs.length > 0) {
        return res.status(500).json({ data: `WARNING ${req.body.id} already exist` })
      } else {
        db.collection('watchlist')
          .add(newWatchlist)
          .then(() => {
            return res.json(newWatchlist)
          })
          .catch(error => {
            console.log(error)
            return res.status(500).json({ error: error.code })
          })
      }
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ error: error })
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
    .where('id', '==', parseInt(req.params.id))
  document.get()
    .then(snapshot => {
      if (snapshot.docs.length > 0) {
        snapshot.docs[0].ref.delete()
        return res.json({ message: `Deleted ${req.params.id}` })
      } else {
        return res.status(404).json({ error: '404 not found' })
      }
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ error: error })
    })
})

module.exports = router