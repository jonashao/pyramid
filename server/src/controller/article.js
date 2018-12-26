const frontArticle = require('../models/frontArticleSchema');
const ArticleModel = require('../models/article');
const backArticle = require('../models/backArticleSchema');
const fs = require('fs');
/**
 * private API
 * @method insert
 * @param {object} 接收发布文章接口传递对象值
 * @return {object|null}  insert Front article
*/

let save = async (ctx) => {
	try{
		let req = ctx.request.body;	
		let {id,title,htmlContent,date,des,original,category} = req;

		req.content = req.htmlContent;
		req.time = req.date;
		const article = new ArticleModel(req);
		// console.log('res',article)
		// article.markModified('content')
		if(!id){
			let res=  await article.save()
			ctx.body = {
				error:0,
				success: res!=null
			}
		}else{
			const front = await ArticleModel.updateOne({_id:id},
				{$set:{category,title,content:htmlContent,time:date,des,original}},{upsert:true});
			// console.log('result',front)
			let {ok} = front;
			ctx.body = {
				error:0,
				success: ok
			}
		}
	}catch(e){
		console.error('update fail ',e)

		ctx.body = {
			error:1,
			info:e
		}
	}
}


let insertArticle = async (ctx) => {
	try{
		let req = ctx.request.body;
		let {title,htmlContent,date,des,original,radio} = req;
		console.log(req)
		const front = await frontArticle.update({title},{$set:{title,content:htmlContent,time:date,des,original,list:radio}},{upsert:true});
		let {ok} = front;
		ctx.body = {
			error:0,
			success:ok
		}
	}catch(e){
		ctx.body = {
			error:1,
			info:e
		}
	}
}

/**
 *public API
 *@param {number|null} page
 *@param {number|null} pagesize
 *@return {object} return article list 按时间排序
*/

let getArticle = async (ctx,next) => {
	try{
		let req = ctx.request.query;
		let { parseInt } = Number;
		let page = parseInt((req.page-1) * req.pagesize);
		let pagesize = parseInt(req.pagesize);
		console.log(page);
		let list =await frontArticle.find({},{__v:0,content:0,original:0,list:0}).skip(page).limit(pagesize).sort({_id:-1});
		let count =await frontArticle.count({});
		ctx.body = {
			error:0,
			count,
			list
		}
	}catch(e){
		ctx.body = {
			error:1,
			info:e
		}
	}
}

/**
 *public API
 *@param {String} id find Article Detail
 *@return {object|null} return Article Detail
*/

let articleInfo = async (ctx,next)=>{
	try{
		let req = ctx.request.query;
		let {id} = req;
		let result = await frontArticle.find({_id:id});
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

const findOneArticle = async (ctx) => {
	try {
	    let req = ctx.request.body;
        let db = await Object.is(req.radio, 'Front') ? frontArticle : backArticle
        let result = await db.findOne({_id:req.id})
    ctx.body = {
      error:0,
      result
    }
  } catch (error) {
    ctx.body = {
      error: 1,
      error
    }
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
	insertArticle,
	getArticle,
	articleInfo,
    uploadFile,
	deleteFile,
	findOneArticle
}
