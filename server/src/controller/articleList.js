const articleModel = require('../models/article');
// const backArticle = require('../models/backArticleSchema');

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
        let front = await articleModel
            .find(conditions,{__v:0,content:0,original:0})
            .populate('category')
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

module.exports = {
    list
}
