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
	category: {
		type: Schema.Types.ObjectId,
		ref: 'category'
	}
});

let articleModel = db.model('article',articleSchema);

module.exports = articleModel;
