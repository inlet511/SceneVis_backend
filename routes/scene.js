const express = require('express');
const sceneModel = require('../models/scene');

const route = express.Router();


//获取所有Scene
route.get('/',(req,res,next)=>{
    sceneModel.find({}).then((scenes)=>{
        res.send(scenes);
    }).catch(next);
});

//获取一个Scene的详情
route.get('/:id',(req,res,next)=>{
    sceneModel.findById(req.params.id).then((result)=>{
        res.send(result);
    }).catch(next);
});

module.exports = route;