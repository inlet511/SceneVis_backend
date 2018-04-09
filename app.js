const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');

const app = express();

mongoose.connect("mongodb://localhost:27017/SceneVis");
mongoose.Promise = global.Promise;


app.use('/',adminRouter);
app.listen(3000);