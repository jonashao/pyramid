const articleModel = require('../models/article');
const backArticle = require('../models/backArticleSchema');

/**
 *public API
 *@method {list | function} article list
 *@return {object} return article List API
*/
let list = async(ctx)=>{
    try{
        console.log('category ', ctx.params.category)
        const category = ctx.params.category
        let req = ctx.request.query;
        let pagesize = parseInt(req.pageSize);
    	let page = parseInt((req.page-1)) * pagesize;
        
        const conditions = {};
        if(category){
            conditions.category = category;
        }
        console.log('condition',conditions)
        let front = await articleModel.find(conditions,{__v:0,content:0,original:0})
            .skip(page).limit(pagesize).sort({'_id':-1});
        let frontCount = await articleModel.count(conditions);
        ctx.body = {
            error: 0,
            count:frontCount,
            list: front
        }
    }catch(e){
        //handle error
        ctx.body = {error:1,info:e}
    }
}

let frontList = async(ctx)=>{
    try{
        let req = ctx.request.query;
    	let { parseInt } = Number;
    	let page = parseInt((req.page-1) * req.pagesize);
    	let pagesize = parseInt(req.pagesize);
        let front = await articleModel.find({},{__v:0,content:0,original:0}).skip(page).limit(pagesize).sort({'_id':-1});
        let frontCount = await articleModel.count({});
        ctx.body = {
            error: 0,
            count:frontCount,
            front
        }
    }catch(e){
        //handle error
        ctx.body = {error:1,info:e}
    }
}

let backList = async(ctx)=>{
    try{
        let req = ctx.request.query;
        let { parseInt } = Number;
        let page = parseInt((req.page-1) * req.pagesize);
        let pagesize = parseInt(req.pagesize);
        let back = await backArticle.find({},{__v:0,content:0,original:0}).skip(page).limit(pagesize).sort({'_id':-1});
        let backCount = await backArticle.count({});
        ctx.body = {
            error: 0,
            count:backCount,
            back
        }
    }catch(e){
        //handle error
        ctx.body = {error:1,info:e}
    }
}

module.exports = {
    list,
    frontList,
    backList
}
