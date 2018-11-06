// REST END POINTS are to be defined here.
(function() {
    'use strict';
    const express = require('express');
    const router = express.Router();
   
    const manager = require('../../Server/Manager/ManagerRoutes');
    const sclerk = require('../../Server/SalesClerk/SalesClerk');
    const common = require('../Common/CommonRoutes');

    // For Everybody 
    router.get('/getDishDetails',common.getDishDetails);
    router.get('/getDishDetails/:category',common.getCategorizedDishDetails);
    router.get('/getCategories',common.getCategories);
    
    // For Managers 
    router.post('/manager/addNewDish',manager.addNewDish);
    router.post('/manager/changeDishPrice',manager.changeDishPrice);
    router.post('/manager/getCustomSalesReport',manager.getSalesReportBetweenDate);
    router.post('/manager/getCustomExpenseReport',manager.getExpenseReportBetweenDate);
    
    router.get('/manager/monthlySaleDetails',manager.getMonthlySalesReport);
    router.get('/manager/weeklySaleDetails',manager.getWeeklySalesReport);
    router.get('/manager/salaryDetails',manager.monthlySalaryDetails);
    router.get('/manager/expenseDetails',manager.monthlyExpenseDetails);
    
    // For SalesClerk 
    router.get('/sclerk/getInvoiceNumber',sclerk.getInvoiceNumber);
    router.post('/sclerk/dishSale',sclerk.dishSale);
    router.post('/sclerk/ingredientPurchase',sclerk.ingredientPurchase);

    module.exports = router;
})();