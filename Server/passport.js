(function() {
    'use strict';
    const passport = require('passport');
    const localStrategy = require('passport-local').Strategy;
    const {db,pgp} = require('./pgpconfig');

    passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'userpassword'
    },
    (username,password,cb) => {
        // need to get the user from the database
        return db.one({
            name: 'find-user',
            text: `select userid,username,roletype from usermaster u1 inner join userrole u2 on u1.role = u2.roleid 
                    where username=$1 and userpassword=$2`,
            values:[username,password]
        })
        .then(user => {
            return cb(null,user,{message: "Logged in successfully"});
        })
        .catch(err => { cb(null,false,{message: "Invalid username and/or password"}) })
    }));
})();