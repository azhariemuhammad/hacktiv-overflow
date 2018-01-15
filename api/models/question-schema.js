const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserHacktiv'
  },
  tag: String,
  title: String,
  question: String,
  like: [{
    type: Schema.Types.ObjectId,
    ref: 'UserHacktiv'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question