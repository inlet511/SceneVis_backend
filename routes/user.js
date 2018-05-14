const express = require('express');
const userModel = require('../models/user');

const route = express.Router();



route.get('/',(req,res,next)=>{
    userModel.find({}).then((users)=>{
        res.send(users);
    }).catch(next);
});

//查看学员详情
route.get('/:id',(req,res,next)=>{
    userModel.findById(req.params.id).then((user)=>{
        res.send(user);
    }).catch(next);
});


module.exports=route;