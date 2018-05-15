const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const sceneRouter = require('./routes/scene');

const app = express();

//Database connection
mongoose.connect("mongodb://localhost:27017/SceneVis");

//Promise
mongoose.Promise = global.Promise;

//Render Engine
app.set("view engine", "ejs");
app.set("views", "views");

var store = new MongoDBStore(
    {
        uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
        databaseName: 'connect_mongodb_session',
        collection: 'mySessions'
    });

// Catch errors
store.on('error', function (error) {
    assert.ifError(error);
    assert.ok(false);
});

//Middleware
app.use(cookie());
app.use(session({
    secret: "8jaslfnqja;a",
    cookie: { maxAge: 3600000 },
    resave: true,
    saveUninitialized: true,
    store: store,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));


//Routes
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/scene', sceneRouter);

// Error Handling
app.use((err, req, res, next) => {
    return res.status(400).send({ error: err.message });
});

app.listen(3000);