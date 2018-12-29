const articleModel = require('../models/article');
// const backArticle = require('../models/backArticleSchema');

/**
 *public API
 *@method {list | function} article list
 *@return {object} return article List API
*/
let list = async(ctx)=>{
    try{
        // console.log('topic ', ctx.params.topic)
        const topic = ctx.params.topic;
        let req = ctx.request.query;
        let pagesize = parseInt(req.pageSize);
    	let page = parseInt((req.page-1)) * pagesize;
        
        const conditions = {};
        if(topic){
            conditions.topic = topic;
        }
        // console.log('condition',conditions)
        let list = await articleModel
            .find(conditions,{__v:0,content:0,original:0})
            .populate('topic')
            .skip(page).limit(pagesize).sort({'_id':-1});
        let count = await articleModel.countDocuments(conditions);
        console.log('list',list);
        ctx.body = {
            error: 0,
            count,
            list
        };
    }catch(e){
        //handle error
        ctx.body = {error:1,info:e};
    }
};

module.exports = {
    list
};
