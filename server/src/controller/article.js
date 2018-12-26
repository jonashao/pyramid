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
		let {id,title,htmlContent,date,des,original,category,originUrl,author} = req;

		console.log(req)
		req.content = req.htmlContent;
		req.time = req.date;
	
		if(!id && id.length===0){
			id = null
		}
		const result = await ArticleModel.updateOne({_id:mongoose.Types.ObjectId(id)},
			{$set:{category,title,content:htmlContent,time:date,des,original,originUrl,author}},{upsert:true});
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

/**
 *private API
 *@param {string|null} id
 *@param {string|null} radio
 *@return {object} return upload list
 */

const uploadFile = async (ctx) => {
    try {
        let req = ctx.req.body;
        let file = ctx.req.file;
        let db = await Object.is(req.radio, 'Front') ? frontArticle : backArticle
        let path = `http://${ctx.headers.host}/uploads/${file.filename}`
        let result = await db.update({_id: req.id }, {$set: {banner: path, imgFileName:file.filename}},{upsert:true})
        ctx.status = 200
        ctx.body = {
            status: ctx.status,
            filename: file.filename,
            path,
            result
        }
    } catch (error) {
        ctx.body = error
    }
}


/**
 *private API
 *@param {string|null} id
 *@param {string|null} radio
 *@return {object} return deleteFile
 */
const deleteFile = async (ctx) => {
    try {
        let request = ctx.request.body
        let db = await Object.is(request.radio, 'Front') ? frontArticle : backArticle
        let { imgFileName } = await db.findById({_id: request.id});
        let path = `${process.cwd()}/public/uploads/${imgFileName}`;
        await fs.unlinkSync(path)
        let result = await db.update({_id: request.id }, {$unset: {banner: -1, imgFileName:-1}})
        ctx.status = 200
        ctx.body = {
            status: ctx.status,
            result
        }
    } catch (error) {
        ctx.body = error
    }
}
module.exports = {
	save,
	content,
	
    uploadFile,
	deleteFile,
}
