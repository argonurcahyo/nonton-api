var router = require('express').Router()
var fire = require('./fire')
var bodyParser = require('body-parser')
var db = fire.firestore()

router.use(bodyParser.json())

router.get('/', (req, res) => {
  var allData = []
  db.collection('watched')
    .orderBy('id', 'asc')
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
  db.collection('watched')
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
  const newData = {
    backdrop_path: req.body.backdrop_path ? req.body.backdrop_path : '',
    genre_ids: req.body.genre_ids ? req.body.genre_ids : [],
    id: req.body.id ? req.body.id : '',
    overview: req.body.overview ? req.body.overview : '',
    poster_path: req.body.poster_path ? req.body.poster_path : '',
    release_date: req.body.release_date ? req.body.release_date : '',
    title: req.body.title ? req.body.title : '',
    vote_average: req.body.vote_average ? req.body.vote_average : '',
  }

  db.collection('watched')
    .where('id', '==', `${req.body.id}`)
    .get()
    .then(snapshot => {
      if (!snapshot.exists) {
        db.collection('watched')
          .add(newData)
          .then(() => {
            return res.json(newData)
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
  let document = db.collection('watched')
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
  let document = db.collection('watched')
    .where('id', '==', parseInt(req.params.id))
  document.get()
    .then(snapshot => {
      if (snapshot) {
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