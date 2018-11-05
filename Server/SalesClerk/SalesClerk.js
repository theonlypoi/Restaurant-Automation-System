// Functionalities for sales clerk are to be defined here.
(function() {
    'use strict';
    const common = require('../Common/CommonRoutes');

    exports.dishSale = function(req,res,next) {
        let objectKeys = ['itemid','quantitysold','totalprice','invoicenumber'];
        let query = common.buildstatement("insert into dishsale(itemid,quantitysold,totalprice,invoicenumber) values",req.body,objectKeys);
        common.dbConnection(query)
                      .then(result => { 
                        res.status(200).json({"message": "Dish Sale Successful"});
                      })
                      .catch(err => { return next(err);})
    };

    exports.ingredientPurchase = function(req,res,next) {
        let objectKeys = ['invoice','ingredientid','quantity','vendorname','totalcost'];
        let query = common.buildstatement
    ("insert into ingredientpurchase(invoice,ingredientid,quantity,vendorname,totalcost) values",req.body,objectKeys);
        common.dbConnection(query)
                      .then(result => {
                        res.status(200).json({message:"Ingredient purchase successful"});
                      })
                      .catch(err => { return next(err);})
    };

    exports.getInvoiceNumber = (req,res,next) => {
        let query = "select * from getlastinvoicenumber()";
        common.dbConnection(query)
                      .then(result => {
                          res.status(200).json(result.rows);
                      })
                      .catch(err => { return next(err);})
    }
})();