const userModel = require('../models/User');
const sha256 = require('./sha256');

/**
 *Private API
 *@method login
 *@param {String|null} username POST
 *@param {String|null} password POST
 *@return {session,info}
*/
let login = async (ctx) =>{
    try{
        console.log('request', ctx.request.body);
        let req = ctx.request.body;
        let {username,password} = req;
        let pwd = sha256(sha256(password).substr(3,8)+sha256(password));
        console.log('pwd',pwd);
        
        let result = await userModel.find({username});
        if (result.length == 0) {
            ctx.body = {
                error:1,
                msg:'username Error'
            };
        }else{
            let [userInfo] = result;
            let {username,password} = userInfo;
            console.log('userinfo',userInfo);
            if (password === pwd) {
                ctx.session.username = username;
                ctx.body = {
                    error:0,
                    success:1,
                    username:ctx.session.username
                };
            }else {
                ctx.body = {
                    error:2,
                    msg:'Unauthorized Password'
                };
            }
        }
    }catch(e){
        ctx.body = {
            error:1,
            info:e
        };
    }
};

module.exports = {
    login
};
