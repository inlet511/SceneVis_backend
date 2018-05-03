const express = require('express');
const sceneModel = require('../models/scene');

const route = express.Router();

//获取所有Scene
route.get('/',(req,res,next)=>{
    sceneModel.find({}).then((scenes)=>{
        res.send(scenes);
    }).catch(next);
});

//创建新的Scene
route.post('/',(req,res,next)=>{
    sceneModel.create({
        SceneName:req.body.SceneName || '',
        Description:req.body.Description || '',
        CreateTime:new Date().getTime(),
        UpdateTime:new Date().getTime(),
        Preparation:{},
        TaskFlow:[]
    }).then((scene)=>{
        res.send(scene);
    }).catch(next);
});

//更改Scene的基本信息
route.put('/:id',(req,res,next)=>{
    sceneModel.findOneAndUpdate({_id:req.params.id},{$set:{
        SceneName:req.body.SceneName || '',
        Description:req.body.Description || '',
        UpdateTime:new Date().getTime()
    }}).then(()=>{
        sceneModel.findOne({_id:req.params.id}).then((scene)=>{
            res.send(scene);
        });
    }).catch(next);
});

//更改Scene的Preparation信息
route.put('/preparation/:id',(req,res,next)=>{
    sceneModel.findOneAndUpdate({_id:req.params.id},{$set:{
        Preparation:req.body
    }}).then(()=>{
        sceneModel.findOne({_id:req.params.id}).then((scene)=>{
            res.send(scene);
        });
    }).catch(next);
});

//更改Scene的TaskFlow信息

module.exports = route;