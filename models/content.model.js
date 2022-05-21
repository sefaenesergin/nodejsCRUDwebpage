//collection altındaki dosyalarin yapısının belli edildiği sistem.
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contentSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    short: {
        type: String,
        require: true,
    },
    long: {
        type: String,
        require: true,
    }
}, {timestamps:true })

const Content = mongoose.model('Content',contentSchema)
module.exports = Content