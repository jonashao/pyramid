var STS = require('qcloud-cos-sts');



let sign = async (ctx)=> {
    try{
        console.log('ctx',ctx.query);
        let {bucket,region} = ctx.query;
        const policy = STS.getPolicy([
            {
                action:[
                    'name/cos:*',
                    // 简单上传
                    'name/cos:PutObject',
                    // 分片上传
                    'name/cos:InitiateMultipartUpload',
                    'name/cos:ListMultipartUploads',
                    'name/cos:ListParts',
                    'name/cos:UploadPart',
                    'name/cos:CompleteMultipartUpload'
                ],
                bucket,
                region,
                prefix: '*'
            }
        ]);
        console.log('policy',policy);
        console.log('id',process.env.COS_SECRETE_ID);
	   const res = await	new Promise((resolve,reject)=>{
            STS.getCredential({
                secretId: process.env.COS_SECRETE_ID,
                secretKey: process.env.COS_SECRETE_KEY,
                policy: policy,
                // durationSeconds: 1800,
                // proxy: '',
            }, function (err, credential) {
                if(err){
                    reject(err);
                }else{
                    resolve(credential);
                }
            });
        });

        console.log(
            'res',res);
        ctx.body = {
            success: res!==null,
            data:res
        };
        // const id = ctx.params
        // let res = await ArticleModel.deleteOne({_id:id});
        // let {n,ok} = res;

    }catch(e){
        ctx.body = {
            error:1,
            info:e
        };
    }
};


module.exports = {
    sign
};
