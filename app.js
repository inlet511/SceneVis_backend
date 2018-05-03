const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const sceneRouter = require('./routes/scene');

const app = express();

mongoose.connect("mongodb://localhost:27017/SceneVis");
mongoose.Promise = global.Promise;

//Middleware
app.use(bodyParser.json());

//Routes
app.use('/admin/', adminRouter);
app.use('/scene/', sceneRouter);

//Error Handling
app.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
});
app.listen(3000);