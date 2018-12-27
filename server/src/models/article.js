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
	category: {
		type: Schema.Types.ObjectId,
		ref: 'category'
	},
	image:{
		url: String,
		name: String
	}
});

let articleModel = db.model('article',articleSchema);

module.exports = articleModel;
