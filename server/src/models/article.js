const mongoose = require('mongoose');
const db = require('./db');
const Schema = mongoose.Schema;

let articleSchema = new mongoose.Schema({
    title:String,
    time:String,
    content:String,
    original:String,
    des:String,
    list:String,
    banner: String,
    imgFileName: String,
    author:String,
    originUrl:String,
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'topic'
    },
    image:{
        url: String,
        name: String
    }
});

let articleModel = db.model('article',articleSchema);

module.exports = articleModel;
