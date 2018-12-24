let crypto = require("crypto");


/**
 *@param {String|null} sha256 hex
 *@return {sha256|null}
*/

module.exports = (pwd)=>{
    var sha256 = crypto.createHash('sha256');
    var password = sha256.update(pwd).digest('hex');
    return password;
}
