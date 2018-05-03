const express = require('express');
const sceneModel = require('../models/scene');

const route = express.Router();
route.get('/scene',(req,res,next)=>{
    sceneModel.find({}).then((scenes)=>{
        res.send(scenes);
    }).catch(next);
});

route.post('/scene',(req,res,next)=>{

});