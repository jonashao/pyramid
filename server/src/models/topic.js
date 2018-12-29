const mongoose = require('mongoose');
const db = require('./db');
let articleSchema = new mongoose.Schema({
    name: String,
    image: String
});

let articleModel = db.model('topic',articleSchema);

module.exports = articleModel;
