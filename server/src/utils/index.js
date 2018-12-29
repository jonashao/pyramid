
/**
 * Authentication middleware for authenticated routes.
 * Use it like:
 * router.get('/authenticated-route', authenticated(), async (ctx, next) {
 * 
 * @param object  ctx     Context
 * @param object  next    if authenticated, goes to next
 * @returns
 */
const passport = require('koa-passport');

exports.authenticated = () => {
    return passport.authenticate('jwt', { session: false });
       
    
};