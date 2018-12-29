const CategoryModel = require('../models/topic');
const mongoose = require('mongoose');

/**
 * private API
 * @method delArticle
 * @param {object} 接收id和list作为删除标志
 * @return {object|null}  return {n:0,ok:0}
*/

let list = async (ctx)=> {
    try{
        let list = await CategoryModel.find();
        let count = await CategoryModel.count();

        ctx.body = {
            error: 0,
            count,
            list
        };
    }catch(e){
        ctx.body = {
            error:1,
            info:e
        };
    }
};

const save = async(ctx)=>{
    try{
        let req = ctx.request.body;	
        let {id,name,desc,image,color} = req;
        console.log('save topic',req);
	
		
        const front = await CategoryModel.updateOne({_id:mongoose.Types.ObjectId(id)},
            {$set:{name,desc,image,color}},{upsert:true});
        // console.log('result',front)
        let {ok} = front;
        ctx.body = {
            error:0,
            success: ok
        };
		
			
    }catch(e){
        console.error('update fail ',e);

        ctx.body = {
            error:1,
            info:e
        };
    }
};

let del = async (ctx)=> {
    try{
        const id = ctx.params.id;
        console.log('id',id);
        let res = await CategoryModel.deleteOne({_id:id});
        let {n,ok} = res;
        ctx.body = {
            del:n,
            ok
        };
    }catch(e){
        ctx.body = {
            error:1,
            info:e
        };
    }
};

module.exports = {
    list,save,del
};
