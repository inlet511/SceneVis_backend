const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const adminModel = require('./models/admin');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const sceneRouter = require('./routes/scene');
const examRouter = require('./routes/exam');

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

//首页路由
app.get('/', (req, res, next) => {
    var loggedin = req.session.loggedin;
    res.render("login",{"loggedin":loggedin});
});

//登录路由
app.post('/login', (req, res, next) => {
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
        }).catch(next);
});

//退出登录
app.get('/logout', (req, res, next) => {
    req.session.loggedin = false;
    res.render("login", { loggedin: false });
});

//登录拦截
app.use('/admin',(req,res,next)=>{
    if(req.session.loggedin!==true)
    {
        res.redirect('/');        
    }else
    {
        next();
    }
})

//Routes
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/scene', sceneRouter);
app.use('/exam', examRouter);

// Error Handling
app.use((err, req, res, next) => {
    return res.status(400).send({ error: err.message });
});

app.listen(3000);