var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var watchlist = require('./api/watchlist')

var app = express()
app.use(cors())
app.use(bodyParser.json())
app.use("/api/watchlist", watchlist)

app.get('/', (req, res) => {
    res.send('<h1>Express + Firestore</h1>')
})

app.listen(3210, () => {
    console.log('running on port 3210')
})