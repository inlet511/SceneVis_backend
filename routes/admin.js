const express = require('express');
const adminModel = require('../models/admin');

const route = express.Router();

route.get('/login',(req,res,next)=>{
    adminModel.findOne({username:req.query.username})
    .then((user)=>{
        console.log(req.query);
        if(user.password === req.query.password)
        {
            res.send({'status':true});
        }else
        {
            res.send({'status':false});
        }
    }).catch(e=>{
        res.send(e.message);
    });
});

module.exports=route;