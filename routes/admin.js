const express = require('express');
const adminModel = require('../models/admin');
const userModel = require('../models/user');
const sceneModel = require('../models/scene');

const route = express.Router();


route.get('/', (req, res, next) => {
    var loggedin = req.session.loggedin;
    res.render("login",{"loggedin":loggedin});
});

route.post('/login', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    adminModel.findOne({ "username": username })
        .then((user) => {
            if (user.password === password) {
                req.session.loggedin = true;
                res.render("login", { loggedin: true });
            } else {
                res.render("login", { loggedin: false });
            }
        }).catch(e => {
            res.send(e.message);
        });
});

route.get('/logout', (req, res, next) => {
    req.session.loggedin = false;
    res.send("successfully logged out!");
});

//管理场景
route.get('/scenes', (req, res, next) => {
    sceneModel.find({}).then((scenes) => {
        res.render("scenes", { "data": scenes });
    }).catch(next);
});

//编辑场景
route.get('/scene/edit/:id', (req, res, next) => {
    sceneModel.findById(req.params.id).then((scene) => {
        res.render("scene_edit", { "scene": scene });
    }).catch(next);
});

//创建场景
route.post('/scene', (req, res, next) => {
    sceneModel.create({
        SceneName: req.body.scenename || '',
        Description: req.body.description || '',
        CreateTime: new Date().getTime(),
        UpdateTime: new Date().getTime(),
        BeginAudio: req.body.beginaudio || '',
        Preparation: {},
        TaskFlow: []
    }).then((scene) => {
        res.send(scene);
    }).catch(next);
});

//更改Scene的基本信息
route.put('/scene/:id', (req, res, next) => {
    sceneModel.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            SceneName: req.body.SceneName || '',
            Description: req.body.Description || '',
            UpdateTime: new Date().getTime(),
            BeginAudio: req.body.BeginAudio || ''
        }
    }).then(() => {
        sceneModel.findOne({ _id: req.params.id }).then((scene) => {
            res.send(scene);
        });
    }).catch(next);
});

//删除一个Scene
route.delete('/scene/:id', (req, res, next) => {
    sceneModel.findOneAndRemove({ _id: req.params.id }).then((scene) => {
        res.send(scene);
    }).catch(next);
});

//更改场景的Preparation信息
route.put('/scene/preparation/:id', (req, res, next) => {
    sceneModel.findByIdAndUpdate(req.params.id, {
        $set: {
            Preparation: req.body,
            UpdateTime: new Date().getTime()
        }
    }).then(() => {
        sceneModel.findById(req.params.id).then((scene) => {
            res.send(scene);
        });
    }).catch(next);
});

//保存场景流程
route.put('/scene/taskflow/:id', (req, res, next) => {
    sceneModel.findByIdAndUpdate(req.params.id, {
        $set: {
            TaskFlow: req.body
        }
    }).then(() => {
        res.send({ status: "Success" });
    }).catch(next);
});


//User
route.get('/user/add', (req, res, next) => {
    userModel.find({}).then((users) => {
        res.render("user", { "users": users });
    }).catch(next);
});

//查看学员详情
route.get('/user/detail/:id', (req, res, next) => {
    userModel.findById(req.params.id).then((user) => {

    }).catch(next);
});

//新增学员
route.post('/user', (req, res, next) => {
    userModel.create(req.body).then((user) => {
        console.log(req.body);
        res.send(user);
    }).catch(next);
});

//更改学员
route.put('/user/:id', (req, res, next) => {
    userModel.findOneAndUpdate({ _id: req.params.id }, req.body).then(() => {
        userModel.findOne({ _id: req.params.id }).then((user) => {
            res.send(user);
        });
    });
});

//删除学员
route.delete('/user/:id', (req, res, next) => {
    userModel.findByIdAndRemove({ _id: req.params.id }).then((user) => {
        res.send(user);
    });
});

module.exports = route;