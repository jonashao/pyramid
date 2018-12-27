const Router = require("koa-router");
const router = new Router();

const article = require('../controller/article');
const articleList = require('../controller/articleList');
const del = require('../controller/delete');

const category = require('../controller/category');

const version = require('../controller/version');
const LoginStrategy = require('../controller/login');
const system = require('../controller/system');

const cos = require('../controller/cos');

const multer = require('koa-multer');
//配置
const storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
const upload = multer({storage: storage})
router.prefix('/api');
/*插入文章接口*/
router.post('/article/save',article.save);

/*文章详情接口*/
router.get('/article/content/:id',article.content);

/*文章列表接口*/
router.get('/article/list/:category*',articleList.list);

/*删除文章接口*/
router.post('/article/del/:id',del.delArticle);

router.get('/category/list', category.list)

router.post('/category/save', category.save)

router.delete('/category/:id', category.del)

/*发布版本接口*/
router.post('/version/insert',version.insertVersion);
/*获取版本接口*/
router.get('/version/getVersion',version.getVersion);

/*登录接口*/
router.post('/login',LoginStrategy.login);
/*控制面板信息*/
router.post('/system',system.controller);

// /*上传接口*/
// router.post('/upload',upload.single('file'), article.uploadFile);
// /*删除图片接口*/
// router.post('/deleteFile', article.deleteFile)


router.get('/cos/sign',cos.sign)
module.exports = router;
