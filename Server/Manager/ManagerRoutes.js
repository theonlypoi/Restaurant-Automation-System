// Routes for the manager is to be defined here.

(function() {
    'use strict';
     const pool = require('../../Server/dbconfig');
     const common = require("../Common/CommonRoutes");

     exports.addNewDish = function(req,res,next) {
        let query = "select * from addNewDish($1,$2,$3,$4,$5)"; 
        let params = [req.body.name,req.body.category,req.body.image,req.body.price,req.body.description];

        common.dbConnection(query,params)
                      .then(result => {
                        if(!result.rows[0].addnewdish){
                            res.status(500).json({
                                "message":"Item Insertion Failed"
                            });
                        } 
                        else {
                            res.status(200).json({
                                "message":"New Dish Inserted Successfully"
                            })
                        }
                      })
                      .catch( err => { return next(err);})
     };

     exports.changeDishPrice = function(req,res,next) {
        let query = "select * from changeDishPrice($1,$2)";
        let params = [req.body.itemid,req.body.price];

        common.dbConnection(query,params)
               .then(result => {
                    if(!result.rows[0].changedishprice){
                        res.status(500).json({
                            "message":" Price Updation Failed"
                        });
                    } else {
                        res.status(200).json({
                            "message":"Price Updation Successful"
                        })
                    }
               })
               .catch(err => { return next(err);})
     };

     exports.getMonthlySalesReport = function(req,res,next) {
        let query = "select * from getMonthlySalesReport()";

        common.dbConnection(query)
                .then(result => {
                    res.status(200).json(result.rows);
                })
                .catch(err => {return next(err);})
     };

     exports.getWeeklySalesReport = function(req,res,next) {
        let query = "select * from getWeeklySalesReport()";

        common.dbConnection(query)
                .then(result => {
                    res.status(200).json(result.rows);
                })
                .catch(err => {return next(err);})
     };

     exports.monthlySalaryDetails = function(req,res,next) {
        let query = "select * from monthlysalarydetails()";

        common.dbConnection(query) 
                    .then(result => {
                        res.status(200).json(result.rows);
                    })
                    .catch(err => { return next(err);})
     };

     exports.monthlyExpenseDetails = function(req,res,next) {
        let query = "select * from getmonthlyexpensereport()";
        common.dbConnection(query)
                .then(result => {
                    res.status(200).json(result.rows);
                })
                .catch(err => {
                    return next(err);
                })
     };

     exports.getSalesReportBetweenDate = function(req,res,next) {
        let query = "select * from getSalesReportBetweenDate($1,$2)";
        let params = [req.body.startdate,req.body.enddate];
        
        common.dbConnection(query,params)
                   .then(result => {
                      res.status(200).json(result.rows);
                   })
                   .catch(err => {
                       return next(err);
                   })
     };

     exports.getExpenseReportBetweenDate = function(req,res,next) {
         let query = "select * from ingredientpurchasebetweendate($1,$2)";
         let params = [req.body.startdate,req.body.enddate];
        
         common.dbConnection(query,params)
                       .then(result => {
                           res.status(200).json(result.rows);
                       })
                       .catch(err => { return next(err);})
    };
})();