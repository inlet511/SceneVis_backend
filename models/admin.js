const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true        
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
});

const AdminModel = mongoose.model('admins',adminSchema);

module.exports=AdminModel;