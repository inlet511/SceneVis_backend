const mongoose = require('mongoose');

const prepareSchema = new mongoose.Schema({

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
    }
});

const SceneModel = mongoose.model('scenes',sceneSchema);

module.exports=SceneModel;