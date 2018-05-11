const express = require('express');
const userModel = require('../models/user');

const route = express.Router();

route.get('/add',(req,res,next)=>{
    userModel.find({}).then((users)=>{
        res.render("user",{"users":users});
    }).catch(next);
});

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

//查看学员详情-网页
route.get('/detail/:id',(req,res,next)=>{
    userModel.findById(req.params.id).then((user)=>{
    
    }).catch(next);
});
route.post('/',(req,res,next)=>{
    userModel.create(req.body).then((user)=>{
        console.log(req.body);
        res.send(user);
    }).catch(next);
});

route.put('/:id',(req,res,next)=>{
    userModel.findOneAndUpdate({_id:req.params.id},req.body).then(()=>{
        userModel.findOne({_id:req.params.id}).then((user)=>{
            res.send(user);
        });
    });
});

route.delete('/:id',(req,res,next)=>{
    userModel.findByIdAndRemove({_id:req.params.id}).then((user)=>{
        res.send(user);
    });
});
module.exports=route;