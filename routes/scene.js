const express = require('express');
const sceneModel = require('../models/scene');

const route = express.Router();

/*CMS路由,用于渲染页面***************************************/

//管理场景
route.get('/admin',(req,res,next)=>{
    sceneModel.find({}).then((scenes)=>{       
        res.render("scene",{"data":scenes});
    }).catch(next);
});

//编辑一个场景
route.get('/edit/:id',(req,res,next)=>{
    sceneModel.findById(req.params.id).then((scene)=>{
        res.render("scene_Detail",{"scene":scene});
    }).catch(next);
});


/*执行路由,用于执行增删改查***************************************/

//获取所有Scene
route.get('/',(req,res,next)=>{
    sceneModel.find({}).then((scenes)=>{
        res.send(scenes);
    }).catch(next);
});

//获取一个Scene
route.get('/:id',(req,res,next)=>{
    sceneModel.findById(req.params.id).then((result)=>{
        res.send(result);
    }).catch(next);
})

//创建操作
route.post('/',(req,res,next)=>{
    console.log("Receive post request:"+JSON.stringify(req.body));
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

//删除一个Scene
route.delete('/:id',(req,res,next)=>{
    sceneModel.findOneAndRemove({_id:req.params.id}).then((scene)=>{
        res.send(scene);
    }).catch(next);
});


/*准备阶段相关***********/

//更改Scene的Preparation信息
route.put('/preparation/:id',(req,res,next)=>{
    sceneModel.findByIdAndUpdate(req.params.id,{$set:{
        Preparation:req.body
    }}).then(()=>{
        console.log(req.body);
        sceneModel.findById(req.params.id).then((scene)=>{
            res.send(scene);
        });
    }).catch(next);
});




/*流程相关***********/

//更改Scene的TaskFlow信息

module.exports = route;