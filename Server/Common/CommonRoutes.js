// Common routes like login,logout,changepassword are to be implemented here.
(function() {
    'use strict';
     const pool = require('../../Server/dbconfig');

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
})();