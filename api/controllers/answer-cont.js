const Answer = require('../models/answer-schema')

const createAnswer = (req, res) => {
  Answer.create(req.body)
  .then(answer => {
    answer.populate('userId')
    answer.populate('questionId')
    .execPopulate()
    res.status(200).send(answer)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
}


const getAllAnswersBasedOnQue = (req, res) => {
  Answer.find()
  .where({ questionId: req.params.id})
  .populate('questionId')
  .populate('userId')
  .populate('votes')
  .exec()
  .then(answers => {
    res.status(200).send(answers)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
}


const findOne = (req, res) => {
  Answer.findOne({_id: req.params.id})
  .populate('questionId')
  .populate('userId')
  .populate('votes')
  .exec()
  .then(answers => {
    res.status(200).send(answers)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
}



const findAll = (req, res) => {
  Answer.find()
  .populate('questionId')
  .populate('userId')
  .populate('votes')
  .exec()
  .then(answer => {
    res.status(200).send(answer)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
}


const editAnswer = (req, res) => {
  Answer.findByIdAndUpdate({ _id: req.params.id },
    {
      userId: req.body.userId,
      questionId: req.body.questionId,
      answer: req.body.answer
    }, { new: true })
    .populate('questionId')
    .populate('userId')
    .populate('votes')
    .exec()
    .then(answer => {
      res.status(200).send(answer)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
}


const votes = (req, res) => {
  Answer.findByIdAndUpdate({ _id: req.params.id }, { $addToSet: { votes: req.body.userId } },{new: true})
  .populate('questionId')
  .populate('userId')
  .populate('votes')
  .then(answer => {
    res.status(200).send(answer)
  })
  .catch(err => {
    console.log(err)
  })
}

const removeElVotesById = (req, res) => {
  Answer.findByIdAndUpdate({_id: req.params.id}, 
    { $pull: { votes: req.body.userId } }, { new: true }
  )
  .populate('questionId')
  .populate('userId')
  .populate('votes')
  .then(answer => {
    console.log(answer)
    res.status(200).send(answer)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
}

const findByIdAndRemove = (req, res) => {
  Answer.findByIdAndRemove({ _id: req.params.id })
    .then(answer => {
      res.status(200).send(answer)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
}


module.exports = {
  createAnswer,
  getAllAnswersBasedOnQue,
  findAll,
  editAnswer,
  findByIdAndRemove,
  votes,
  removeElVotesById,
  findOne
}