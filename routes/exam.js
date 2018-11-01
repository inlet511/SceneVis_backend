const express = require('express');
const examModel = require('../models/exam');
const userModel = require('../models/user');
const moment = require('moment');

const route = express.Router();

route.get('/',(req,res,next)=>{
    examModel.find({}).populate('sceneID','SceneName').populate('userID','name').then((exams)=>{
        res.render("exams", { "exams": exams });
    }).catch(next);
});

route.post('/',(req,res,next)=>{
    examModel.create(req.body).then((exam)=>{
        console.log(req.body);
        res.send(exam);
    }).catch(next);
});

module.exports = route;