(function() {
    'use strict';

    const jwt = require('jsonwebtoken');

    const tokenForUser = (user) => {
        return jwt.sign({id: user.userid,name: user.username,roletype: user.roletype},'4$35%gdh^&@shhs',{
            expiresIn: 24*60*60
        });
    }

    const verifyUser =  (req,res,next) => {
        let token = req.headers['authorization'];
        if(token && token.startsWith('Bearer ')) {
          token = token.slice(7,token.length).trimLeft();
          jwt.verify(token,'4$35%gdh^&@shhs',function(err,decoded) {
            if(err) {
              var err = new Error("You are not authenticated!");
              err.status = 401;
              return next(err);
            } else {
              req.decoded = decoded;
              next();
            }
          });
        } else {
          var err = new Error("Unauthorized Access");
          err.status = 403;
          return next(err);
        }
    }

    const verifyManager = (req,res,next) => {
        if(req.decoded.roletype === 'Manager') {
          next();
        }
        else {
          var err = new Error("You are not authorized to perform this task");
          err.status = 403;
          return next(err);
        }
    };

    const verifySalesClerk = (req,res,next) => {
        if(req.decoded.roletype === 'Sales Clerk') {
          next();
        }
        else {
          var err = new Error("You are not authorized to perform this task");
          err.status = 403;
          return next(err);
        }
    };

    module.exports = {tokenForUser,verifyUser,verifyManager,verifySalesClerk};
})();