const express = require('express');
const userModel = require('../models/user');

const route = express.Router();

route.get('/user',(req,res,next)=>{
    userModel.find({}).then((users)=>{
        res.send(users);
    }).catch(next);
});

route.post('/user',(req,res,next)=>{
    userModel.create(req.body).then((user)=>{
        res.send(user);
    }).catch(next);
});

route.put('/user/:id',(req,res,next)=>{
    userModel.findOneAndUpdate({_id:req.params.id},req.body).then(()=>{
        userModel.findOne({_id:req.params.id}).then((user)=>{
            res.send(user);
        });
    });
});

route.delete('/user/:id',(req,res,next)=>{
    userModel.findByIdAndRemove({_id:req.params.id}).then((user)=>{
        res.send(user);
    });
});
module.exports=route;