(function() {
    'use strict';
     require('dotenv').config({path:'./secret.env'});
     const express = require('express');
     const bodyParser = require('body-parser');
     const morgan  = require('morgan');
     const cors = require('cors');
     const port = process.env.EXPRESS_PORT || 8080;
     const host = process.env.APP_HOST || 'localhost';
     
     const corsOptions = {
         "origin": "*",
         "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
         "preflightContinue":false,
         "optionSuccessStatus": 200,
         "allowHeaders": ['Content-Type','Authorization','x-access-token'] 
     }

     const app = express();
     app.use(morgan('combined'));
     app.use(cors(corsOptions));

     app.use(bodyParser.urlencoded({extended: false}));
     app.use(bodyParser.json());

     // REST END POINTS TO BE DEFINED HERE
     // In the Routes folder inside the routes.js file REST END POINTS are defined.

     const routes = require('./Server/Routes/routes.js');
     app.use('/',routes);

     app.use(function(err,req,res,next){
        res.status(err.status || 500).json({
            message: err.message || "Internal Error",
            error: err
        });
     });

     app.listen(port,host,function(){
        console.log(`Listening at http://${host}:${port}`);
     });
})();