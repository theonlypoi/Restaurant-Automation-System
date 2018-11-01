// Functionalities for sales clerk are to be defined here.
(function() {
    'use strict';
    const common = require('../Common/CommonRoutes');

    exports.dishSale = function(req,res,next) {
        let query = common.buildstatement("insert into dishsale(itemid,quantitysold,totalprice,invoicenumber) values",req.body);
        common.dbConnection(query)
                      .then(result => { 
                        res.status(200).json({"message": "Dish Sale Successful"});
                      })
                      .catch(err => { return next(err);})
    };

    exports.ingredientPurchase = function(req,res,next) {
        let query = common.buildstatement
    ("insert into ingredientpurchase(invoice,ingredientid,quantity,vendorname,totalcost) values",req.body);
        common.dbConnection(query)
                      .then(result => {
                        res.status(200).json({message:"Ingredient purchase successful"});
                      })
                      .catch(err => { return next(err);})
    };
})();