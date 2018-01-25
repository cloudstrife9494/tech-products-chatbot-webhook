var express = require('express');
var router = express.Router();

//var helpers = require('../data/helpers');
//var state = require('./conversationState');
var webhookMethods = require('./webhookMethods');

router.get('/test',function (req,res) {
   res.json({success : true , method : "GET method 2" , message : "success"});
});

router.post('/test',function (req,res) {
    res.json({success : true , method : "POST method" , message : "success"});
});


router.post('/',function(req,res){

    let speech ;

    if(req.body.result && req.body.result.parameters) {



        if (req.body.result.parameters.presentStore) {
            speech = webhookMethods.readyToStartConfirmation(req);
        }
        else if(req.body.result.parameters.defineCategory){
            speech = webhookMethods.defineCategoryMethod(req);
        }
        else if(req.body.result.parameters.defineBrand){
            speech = webhookMethods.defineBrandMethod(req);
        }
        else if(req.body.result.parameters.productConfirmation){
            speech = webhookMethods.productionConfirmationMethod(req);
        }
        else if(req.body.result.parameters.defineProduct){
            speech = webhookMethods.defineProducts(req);
        }
        else if(req.body.result.parameters.defineMoreAbout){
            speech = webhookMethods.defineMoreAboutMethod(req);
        }
        else if(req.body.result.parameters.testParam){
            speech = webhookMethods.testMethod(req,res);
        }
        else{
            speech = "sorry! something bad happened. Try again!";
        }



    }
    else{
      speech = "sorry! something bad happened. Try again!";
    }

    res.json({
        speech: speech,
        displayText: speech,
        source: "presentStore"
    });
});



module.exports = router;