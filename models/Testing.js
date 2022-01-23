const mongoose = require('mongoose')

const WatchlistSchema = new mongoose.Schema ({
    user: String,
    symbol: String
})

const Watchlist = mongoose.model('Watchlist',WatchlistSchema)

module.exports = Watchlist