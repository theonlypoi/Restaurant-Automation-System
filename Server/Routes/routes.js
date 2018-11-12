// REST END POINTS are to be defined here.
(function() {
    'use strict';
    const express = require('express');
    const router = express.Router();
   
    const manager = require('../../Server/Manager/ManagerRoutes');
    const sclerk = require('../../Server/SalesClerk/SalesClerk');
    const common = require('../Common/CommonRoutes');

    const passport = require('passport');
    const auth = require('../authentication/auth');
    const loginAuthenticator = passport.authenticate('local',{session: false});

    // For Everybody 
    router.post('/login',loginAuthenticator,common.login);
    router.get('/logout',auth.verifyUser,common.logout);
    router.get('/getDishDetails',auth.verifyUser,common.getDishDetails);
    router.get('/getDishDetails/:category',auth.verifyUser,common.getCategorizedDishDetails);
    router.get('/getCategories',auth.verifyUser,common.getCategories);
    router.get('/availableStock',auth.verifyUser,auth.verifySalesClerk,common.getDishStock);
    
    // For Managers 
    router.post('/manager/addNewDish',auth.verifyUser,auth.verifyManager,manager.addNewDish);
    router.post('/manager/changeDishPrice',auth.verifyUser,auth.verifyManager,manager.changeDishPrice);
    router.post('/manager/getCustomSalesReport',auth.verifyUser,auth.verifyManager,manager.getSalesReportBetweenDate);
    router.post('/manager/getCustomExpenseReport',auth.verifyUser,auth.verifyManager,manager.getExpenseReportBetweenDate);
    
    router.get('/manager/monthlySaleDetails',auth.verifyUser,auth.verifyManager,manager.getMonthlySalesReport);
    router.get('/manager/weeklySaleDetails',auth.verifyUser,auth.verifyManager,manager.getWeeklySalesReport);
    router.get('/manager/salaryDetails',auth.verifyUser,auth.verifyManager,manager.monthlySalaryDetails);
    router.get('/manager/expenseDetails',auth.verifyUser,auth.verifyManager,manager.monthlyExpenseDetails);
    
    // For SalesClerk 
    router.get('/sclerk/getInvoiceNumber',auth.verifyUser,auth.verifySalesClerk,sclerk.getInvoiceNumber);
    router.get('/sclerk/getStockDetails',auth.verifyUser,auth.verifySalesClerk,sclerk.getStockDetails);
    router.get('/sclerk/stockInvoiceNumber',auth.verifyUser,auth.verifySalesClerk,sclerk.getStockInvoiceNumber);
    router.get('/sclerk/getIngredients',auth.verifyUser,auth.verifySalesClerk,sclerk.getIngredients);
    router.post('/sclerk/dishSale',auth.verifyUser,auth.verifySalesClerk,sclerk.dishSale);
    router.post('/sclerk/ingredientPurchase',auth.verifyUser,auth.verifySalesClerk,sclerk.ingredientPurchase);
    router.post('/sclerk/addNewStock',auth.verifyUser,auth.verifySalesClerk,sclerk.refreshStock);


    module.exports = router;
})();