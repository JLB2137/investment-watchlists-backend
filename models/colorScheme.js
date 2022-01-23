const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema ({
    user: String,
    navColor: String,
    accentColor: String
})

const ColorScheme = mongoose.model('ColorScheme',colorSchema)

module.exports = ColorScheme