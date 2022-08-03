var router = require('express').Router()
var fire = require('./fire')
var bodyParser = require('body-parser')
var db = fire.firestore()

// router.use(bodyParser.json())

router.get("/", async (req, res) => {
    try {
        res.json({
            status: 200,
            message: "Get data has successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

// router.get('/data', (req, res) => {
//     db.settings({
//         timestampsInSnapshots: true
//     })
//     var allData = []
//     db.collection('watchlist').get()
//         .then(snapshot => {
//             snapshot.forEach(hasil => {
//                 allData.push(hasil.data())
//             })
//             console.log(allData)
//             res.send(allData)
//         }).catch(error => {
//             console.log(error)
//         })
// })

module.exports = router