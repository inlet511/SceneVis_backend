const express = require('express');
const examModel = require('../models/exam');

const route = express.Router();

// 网页显示所有考核成绩
route.get('/', (req, res, next) => {
    //populate 联表查询， 只取场景名称和用户名称两个字段
    examModel
    .find({})
    .populate('sceneID', 'SceneName')
    .populate('userID', 'name')
    .then((exams) => {
        res.render("exams", { "exams": exams });
    }).catch(next);
});

//添加考试结果
route.post('/', (req, res, next) => {
    examModel.create(req.body).then((exam) => {
        console.log(req.body);
        res.send(exam);
    }).catch(next);
});

// 返回json格式的所有考核成绩的
route.get('/json', (req, res, next) => {
    //populate 联表查询， 只取场景名称和用户名称两个字段
    examModel
    .find({})
    .populate('sceneID', 'SceneName')
    .populate('userID', 'name')
    .then((exams) => {
        res.send(exams);
    }).catch(next);
});

route.get('/findByUser',(req,res,next)=>{
    res.render("findexams.ejs");
});

route.post('/findByUser',(req,res,next)=>{
    examModel.find({})
    .populate('sceneID', 'SceneName')
    .populate('userID','name')
    .findOne({'userID.name':req.params.userName})
    .then((result)=>{
        res.send(result);
    }).catch(next);
});



module.exports = route;