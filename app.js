const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const sceneRouter = require('./routes/scene');

const app = express();

//Database connection
mongoose.connect("mongodb://localhost:27017/SceneVis");

//Promise
mongoose.Promise = global.Promise;

//Render Engine
app.set("view engine","ejs");
app.set("views","views");

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

//Routes
app.use('/admin', adminRouter);
app.use('/scene', sceneRouter);

//Error Handling
app.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
});

app.listen(3000);