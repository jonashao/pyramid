const ArticleModel = require('../models/article');
const fs = require('fs');
const mongoose = require('mongoose');

/**
 * private API
 * @method insert
 * @param {object} 接收发布文章接口传递对象值
 * @return {object|null}  insert Front article
*/

let save = async (ctx) => {
	try{
		let req = ctx.request.body;	
		let {id,title,htmlContent,date,des,original,category,originUrl,author,image} = req;

		console.log(req)
		req.content = req.htmlContent;
		req.time = req.date;
	
		if(!id && id.length===0){
			id = null
		}
		const result = await ArticleModel.updateOne({_id:mongoose.Types.ObjectId(id)},
			{$set:{category,title,content:htmlContent,time:date,des,original,originUrl,author,image}},{upsert:true});
		let {ok} = result;
		ctx.body = {
			error:0,
			success: ok
		}
		// }
	}catch(e){
		console.error('update fail ',e)

		ctx.body = {
			error:1,
			info:e
		}
	}
}


let content = async (ctx,next)=>{
	try{
		let req = ctx.request.query;
		let {id} = req;
		let result = await ArticleModel.find({_id:id});
		ctx.body = {
			error:0,
			info:result
		}
	}catch(e){
		ctx.body = {
			error:1,
			error:e
		}
	}
}

module.exports = {
	save,
	content
}
