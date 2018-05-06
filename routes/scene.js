const express = require('express');
const sceneModel = require('../models/scene');

const route = express.Router();


//管理场景
route.get('/admin',(req,res,next)=>{
    sceneModel.find({}).then((scenes)=>{       
        res.render("scene",{"data":scenes});
    }).catch(next);
});

//获取所有Scene
route.get('/',(req,res,next)=>{
    sceneModel.find({}).then((scenes)=>{
        res.send(scenes);
    }).catch(next);
});

//创建操作
route.post('/',(req,res,next)=>{
    console.log("get post request:"+JSON.stringify(req.body));
    sceneModel.create({
        SceneName:req.body.scenename || '',
        Description:req.body.description || '',
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

route.delete('/:id',(req,res,next)=>{
    sceneModel.findOneAndRemove({_id:req.params.id}).then((scene)=>{
        res.send(scene);
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