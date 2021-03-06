const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserHacktiv'
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  answer: String,
  votes: [{
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

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer