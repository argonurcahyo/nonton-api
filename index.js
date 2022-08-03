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

const PORT = 3210

app.listen(PORT, () => {
    console.log(`running on https://localhost:${PORT}`)
})