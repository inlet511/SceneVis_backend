const mongoose = require('mongoose');

const prepareSchema = new mongoose.Schema({
    TimeLimit:{
        type:Number,
        required:true
    },
    Score:{
        type:Number,
        default:0,
        required:false
    },
    ActionsInvolved:{
        type:
    }
});

const stepSchema = new mongoose.Schema({

});

const sceneSchema = new mongoose.Schema({
    SceneName:{
        type:String,
        required:true,
        trim:true        
    },
    Description:{
        type:String,
        required:true,
        trim:true,
    },
    CreateTime:{
        type:Date,
        required:false        
    },
    UpdateTime:{
        type:Date,
        required:false
    },
    Preparation:[prepareSchema]
});

const SceneModel = mongoose.model('scenes',sceneSchema);

module.exports=SceneModel;