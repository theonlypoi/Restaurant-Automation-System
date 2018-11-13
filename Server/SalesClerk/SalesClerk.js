// Functionalities for sales clerk are to be defined here.
(function() {
    'use strict';
    const common = require('../Common/CommonRoutes');
    const {db,pgp} = require('../pgpconfig');

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

    exports.getStockInvoiceNumber = (req,res,next) => {
      let query = "select max(invoice) as invoice from ingredientpurchase";
      common.dbConnection(query)
          .then(result => {
              res.status(200).json(result.rows);
          })
          .catch(err => { return next(err);})
    }

    /* These are to be implemented as postgresql functions. Try to implement if time permits.*/
    exports.getStockDetails = (req,res,next) => {
        let query = "select * from getdishStockDetails()";
        common.dbConnection(query) 
                      .then(result => {
                        res.status(200).json(result.rows);
                      })
                      .catch(err => { return next(err);})
    }

    exports.getIngredients = (req,res,next) => {
      let query = "select * from ingredient order by ingredientid";
      common.dbConnection(query)
                    .then(result => {
                      res.status(200).json(result.rows);
                    })
                    .catch(err => { return next(err);}) 
    }

    exports.refreshStock = (req,res,next) => {
        // for multi update using pg-promise 
        const cs = new pgp.helpers.ColumnSet(['?ingredientid','availability'],{table:'ingredient'});
        const update = pgp.helpers.update(req.body,cs) + 'WHERE v.ingredientid = t.ingredientid';

        db.none(update)
          .then(()=>{
            res.status(200).json({"message":"Stock Details Updated"});
          })
          .catch(err => {
            return next(err);
          });
    }

    exports.allocateIngredient = (req,res,next) => {
      const cs = new pgp.helpers.ColumnSet(['itemid', 'ingredientid','quantityrequired'], {table: 'ingredientforitem'}); 
      // generating a multi-row insert query:
      const query = pgp.helpers.insert(req.body, cs);

      // executing the query:
      db.none(query)
          .then(data => {
              res.status(200).json({
                "message":"Allocated Ingredients for the dish."
              })
          })
          .catch(error => {
              return next(error);
          });
      }
})();