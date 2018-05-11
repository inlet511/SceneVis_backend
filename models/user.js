const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true        
    },
    gender:{
        type:String,
        required:true,
        trim:true,
        default:"男"
    },
    employeeID:{
        type:String,
        required:false
    },
    examID:{
        type:[String]
    }
});

const UserModel = mongoose.model('users',userSchema);

module.exports=UserModel;