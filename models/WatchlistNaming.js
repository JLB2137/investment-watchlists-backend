const mongoose = require('mongoose')

const WatchlistSchema = new mongoose.Schema ({
    user: String,
    watchlistName: String,
    navColor: String,
    accentColor: String
})

const WatchlistNaming = mongoose.model('WatchlistNaming',WatchlistSchema)

module.exports = WatchlistNaming