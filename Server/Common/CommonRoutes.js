// Common routes like login,logout,changepassword are to be implemented here.
(function() {
    'use strict';
     const pool = require('../../Server/dbconfig');
     const auth = require('../authentication/auth');

     // From Github page of node-postgres  issue #530
     // May give some wrong result, probably because of the unordered nature of Object.Keys()
     // This will be used when we need to insert multiple rows of data to db
     exports.buildstatement = function(query,rows,objectKeys) { 
        const params = [];
        const chunks = [];
        rows.forEach(row => {
            const valueclause = [];
            /*Object.keys(row).forEach(p => {
                params.push(row[p]);
                valueclause.push('$' + params.length);
            })*/
            objectKeys.forEach(key => {
                params.push(row[key]);
                valueclause.push('$' + params.length);
            });
            chunks.push('(' + valueclause.join(',') + ')');
        })

        return {
            text: query + chunks.join(','),
            values: params
        }        
     };

    // common place for connecting to the db and retrieving the results
     let dbConnection = function(query,params) {
        return new Promise(function(resolve,reject) {
            pool.connect() 
                .then(client => {
                    if(params !== undefined){
                        const result = client.query(query,params);
                        client.release();
                        resolve(result);
                    } else {
                        const result = client.query(query);
                        client.release();
                        resolve(result);
                    }
                })
                .catch(err => {
                    client.release();
                    reject(new Error(err));
                });
        });
     }
     // exporting the above function 
     exports.dbConnection = dbConnection;

     // Get All Dish Details 
     exports.getDishDetails = function(req,res,next) {
         let query = "select * from getDishDetails()";
          
         dbConnection(query)
                .then(result => {
                    res.status(200).json(result.rows);
                })
                .catch(err => {return next(err);})
    }

    exports.getCategorizedDishDetails = function(req,res,next) {
        let query = "select * from getCategorizedDishDetails($1)";
        let params = [req.params.category];
        
        dbConnection(query,params) 
               .then(result => {
                   res.status(200).json(result.rows);
               })
               .catch(err => { return next(err);})
    }

    exports.getCategories = function(req,res,next) {
        let query = "select * from getCategories()";
        
        dbConnection(query) 
               .then(result => {
                   res.status(200).json(result.rows);
               })
               .catch(err => { return next(err);})
    }

    exports.getDishStock = function(req,res,next) {
        let query = "select * from getdishstockdetails()";

        dbConnection(query) 
               .then(result =>  {
                   res.status(200).json(result.rows);
               })
               .catch(err => { return next(err);})
    }


    exports.login = (req,res,next) => {
        if(req.user) {
            // if user is already present in the request body
            // find out the token
            const token = auth.tokenForUser(req.user);
            const id = req.user.userid,
                  username = req.user.username,
                  roletype = req.user.roletype;
            // send the token to the client side
            res.status(200).json({
                'token':token, 
                'roletype': roletype,
            });
        } else {
            res.status(403).json({
                "message":"Unauthorized access"
            })
        }
    }

    exports.logout = (req,res) => {
        if(req.user){
         req.logOut();
         res.status(200).json({
             "message":"Successfully logged out"
         })
        }
        else{
          res.status(401).json({
            message: 'You are not logged in!'
          });
        }
      }
})();