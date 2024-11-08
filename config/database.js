const mongoose = require('mongoose')

const URI = 'mongodb+srv://juan:XcVPysk740LrPiEW@clusteradsi2557466.uhiweda.mongodb.net/FakeStore2'

mongoose.connect(URI, {
})

module.exports = mongoose

