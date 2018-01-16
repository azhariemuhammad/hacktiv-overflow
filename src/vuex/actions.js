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
        console.log(data, 'create answer')
        commit('setNewAnswer', data)
      })
      .catch(err => console.log(err))
  },
  update ({commit}, payload) {
    let id = payload.id
    http.put(`questions/${id}`, {
      title: payload.title,
      userId: localStorage.getItem('uidHacktiv'),
      question: payload.question
    })
      .then(({data}) => {
        console.log(data)
        commit('setOneQuestion', data)
      })
      .catch(err => console.log(err))
  },
  removeQuestion ({commit}, payload) {
    let id = payload
    console.log(payload, 'remove')
    http.delete(`questions/${id}`)
      .then(({data}) => {
        console.log(data)
      })
      .catch(err => console.log(err))
  },
  removeAns ({commit}, payload) {
    let id = payload
    http.delete(`answers/${id}`)
      .then(({data}) => {
        console.log(data)
        commit('deletAns', payload)
      })
      .catch(err => console.log(err))
  },
  updateAnswer ({commit}, payload) {
    http.put(`answers/edit/${payload.id}`, {
      userId: payload.userId,
      questionId: payload.queId,
      answer: payload.answer
    })
      .then(({data}) => {
        commit('pushNewUpdateAns', data)
      })
      .catch(err => console.log(err))
  },
  likeAns ({commit}, payload) {
    http.put(`answers/${payload.id}/votes`, {
      userId: payload.userId
    })
      .then(({data}) => {
        console.log(data)
        commit('pushNewUpdateAns', data)
        alert('likes')
      })
      .catch(err => console.log(err))
  },
  unLike ({commit}, payload) {
    http.put(`answers/${payload.id}/removevotes`, {
      userId: payload.userId
    })
      .then(({data}) => {
        console.log(data)
        commit('pushNewUpdateAns', data)
        alert('unlike')
      })
      .catch(err => console.log(err))
  },
  likeQuest ({ commit }, payload) {
    http.put(`questions/${payload.id}/like`, {
      userId: payload.userId
    })
      .then(({ data }) => {
        console.log(data, '34989023859028590180')
        commit('setOneQuestion', data)
        alert('likes')
      })
      .catch(err => console.log(err))
  },
  unLikeQuest ({ commit }, payload) {
    http.put(`questions/${payload.id}/dislike`, {
      userId: payload.userId
    })
      .then(({ data }) => {
        console.log(data)
        commit('setOneQuestion', data)
        alert('unlike')
      })
      .catch(err => console.log(err))
  }
}

export default actions
