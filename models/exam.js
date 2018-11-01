const mongoose = require('mongoose')

const examSchema = new mongoose.Schema(
  {
    sceneID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'scenes',
      required: true
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      retuired: true
    },
    score: {
      type: Number,
      required: false
    }
  },
  {
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime'
    }
  }
)

const examModel = mongoose.model('exams', examSchema)

module.exports = examModel
