const Question = require('../models/question-schema')
let message = ''

const createQuest = (req, res) => {
  Question.create({
    question: req.body.question,
    userId: req.body.userId,
    tag: req.body.tag,
    title: req.body.title
  })
  .then(question => {
    question.populate('userId')
    question.populate('like')
    .execPopulate()
    res.status(200).send(question)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

const getAllQuest = (req, res) => {
  Question.find()
  .populate('userId')
  .then(questions => {
    res.status(200).send(questions)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

const findById = (req, res) => {
  Question.findById({_id: req.params.id})
  .populate('userId')
  .populate('like')
  .then(question => {
    res.status(200).send(question)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

const findByIdAndUpdate = (req, res) => {
  Question.findByIdAndUpdate({ _id: req.params.id }, {
    question: req.body.question,
    tag: req.body.tag,
    title: req.body.title
  }, {new: true})
    .populate('userId')
    .populate('like')
    .then(question => {
      res.status(200).send(question)
    })
    .catch(err => {
      console.log(err)
    })
}

const like = (req, res) => {
  Question.findByIdAndUpdate({_id: req.params.id}, {
    $addToSet: {like: req.body.userId}
  }, {new: true})
  .populate('userId')
  .populate('like')
  .then(question => {
    res.status(200).send(question)
  })
  .catch(err => {
    console.log(err)
  })
}

const dislike = (req, res) => {
  console.log(req.params.id,'ini req')
  Question.findByIdAndUpdate({_id: req.params.id},
  { $pull: { like: req.body.userId }
  }, {new: true})
  .populate('userId')
  .populate('like')
  .then(question => {
    console.log(res)
    res.status(200).json(question)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

const findByIdAndRemove = (req, res) => {
  Question.findByIdAndRemove({ _id: req.params.id })
  .then(question => {
    res.status(200).send(question)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}


module.exports = {
  createQuest,
  getAllQuest,
  findById,
  findByIdAndUpdate,
  findByIdAndRemove,
  like,
  dislike
}

