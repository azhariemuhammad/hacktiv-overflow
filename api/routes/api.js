const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-cont')
const questController = require('../controllers/question-cont')
const answerController = require('../controllers/answer-cont')

// ================= users 
router.post('/users', userController.createUser)

router.get('/users/:id', userController.findById)

router.put('/users/:id', userController.findByIdAndUpdate)

router.get('/users', userController.getAllUsers)

router.delete('/users/:id', userController.findByIdAndRemove)

// ================= questions 
router.post('/questions', questController.createQuest)

router.get('/questions', questController.getAllQuest)

router.get('/questions/:id', questController.findById)

router.put('/questions/:id', questController.findByIdAndUpdate)

router.put('/questions/:id/like', questController.like)

router.put('/questions/:id/dislike', questController.dislike)

router.delete('/questions/:id', questController.findByIdAndRemove)

// ================= answer

router.post('/answers', answerController.createAnswer)

router.get('/questions/:id/answers', answerController.getAllAnswersBasedOnQue)

router.get('/answers', answerController.findAll)

router.get('/answers/:id', answerController.findOne)

router.put('/answers/:id/votes', answerController.votes)

router.put('/answers/edit/:id', answerController.editAnswer)

router.put('/answers/:id/removevotes', answerController.removeElVotesById)

router.delete('/answers/:id', answerController.findByIdAndRemove)

module.exports = router
