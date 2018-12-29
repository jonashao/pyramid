const passport = require('koa-passport');
const User = require('./models/User');

const fetchUser = (() => {
    // This is an example! Use password hashing in your project and avoid storing passwords in your code
    const user = { id: 1, username: 'admin', password: 'aaa111' };
    return async function() {
        return user;
    };
})();

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await fetchUser();
        done(null, user);
    } catch(err) {
        done(err);
    }
});


const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        console.log('jwt err',err);
        if (err) {
            return done(err, false);
        }
        console.log('jwt user',user);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done) {
    fetchUser()
        .then(user => {
            if (username === user.username && password === user.password) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
        .catch(err => done(err));
}));

const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
},
function(token, tokenSecret, profile, done) {
    // retrieve user ...
    fetchUser().then(user => done(null, user));
}
));


const GoogleStrategy = require('passport-google-auth').Strategy;
passport.use(new GoogleStrategy({
    clientId: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
},
function(token, tokenSecret, profile, done) {
    // retrieve user ...
    fetchUser().then(user => done(null, user));
}
));
