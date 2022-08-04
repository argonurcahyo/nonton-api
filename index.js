var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var watchlist = require('./api/watchlist')
var watched = require('./api/watched')

var app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.setHeader('charset', 'utf-8')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});

app.use("/api/watchlist", watchlist)
app.use("/api/watched", watched)

app.get('/', (req, res) => {
    res.send('<h1>Express + Firestore</h1>')
})

const PORT = 3210

app.listen(PORT, () => {
    console.log(`running on https://localhost:${PORT}`)
})