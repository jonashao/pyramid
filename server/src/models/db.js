const mongoose = require('mongoose');
// const db = mongoose.createConnection('mongodb://120.78.221.76/blog');
const db = mongoose.createConnection('mongodb://127.0.0.1/blog');
const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

db.once('open',()=>{
    console.log(success('数据库连接成功'));
});

db.on('error',()=>{
    console.log(error('数据库连接失败'));
});

/**
 * private
 * 封装连接数据库
*/

module.exports = db;
