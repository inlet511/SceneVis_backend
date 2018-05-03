const mongoose = require('mongoose');

const examSchema = mongoose.Schema(
    {
        time:{
            type:Date,
            required:true
        },
        sceneID:{
            type:String,
            required:true
        },
        score:{
            type:Number,
            required:false
        }
    }
);

const examModel = mongoose.model('exams',examSchema);

module.exports = examModel;