import firebase from '../firebase.js'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/api/'
})

const actions = {
  googleAuth: ({commit}, payload) => {
    let provider1 = new firebase.auth.GoogleAuthProvider()
    provider1.addScope('https://www.googleapis.com/auth/contacts.readonly')
    provider1.addScope('profile')
    provider1.addScope('email')
    let vm = http
    let push = commit
    firebase.auth().signInWithPopup(provider1)
      .then((result) => {
        console.log('token: ', result.user.photoURL)
        let user = result.user
        let email = user.email
        let username = user.displayName
        vm.post('/users', {
          username: username,
          email: email
        })
          .then(({data}) => {
            console.log(data, 'users db')
            push('saveUser', data.doc)
          })
          .catch(err => console.log(err))
      })
      .catch(err => alert(err.message))
  },
  getQuestions: ({commit}, payload) => {
    http.get('/questions')
      .then(({data}) => {
        console.log(data, 'data question')
        commit('setQuestions', data)
      })
      .catch(err => console.error(err))
  },
  postQuestion: ({commit}, payload) => {
    console.log('pauload', payload)
    http.post('/questions', {
      userId: payload.userId,
      question: payload.question,
      title: payload.title
    })
      .then(({data}) => {
        console.log('data post: ', data)
        commit('setNewQuestion', data)
      })
      .catch(err => console.error(err))
  },
  getQuestionById ({commit}, payload) {
    let id = payload
    http.get('questions/' + id)
      .then(({ data }) => {
        console.log(data, '===')
        commit('setOneQuestion', data)
      })
      .catch(err => console.log(err))
  },
  getAnswersBasedOnQue ({commit}, payload) {
    let id = payload
    http.get(`questions/${id}/answers`)
      .then(({data}) => {
        console.log(data, '=======')
        commit('setAnswers', data)
      })
      .catch(err => console.log(err))
  },
  postAnswer ({commit}, payload) {
    http.post('answers', {
      userId: localStorage.getItem('uidHacktiv'),
      questionId: payload.queId,
      answer: payload.answer
    })
      .then(({data}) => {
        console.log(data)
        commit('setNewAnswer', data)
      })
      .catch(err => console.log(err))
  }
}

export default actions
