const mutations = {
  saveUser: function (state, payload) {
    localStorage.setItem('emailHacktiv', payload.email)
    localStorage.setItem('usernameHacktiv', payload.username)
    localStorage.setItem('uidHacktiv', payload._id)
    alert('succes login')
  },
  removeUser: function (state, payload) {
    localStorage.removeItem('emailHacktiv')
    localStorage.removeItem('usernameHacktiv')
    localStorage.removeItem('uidHacktiv')
  },
  setQuestions: function (state, payload) {
    state.questions = payload
  },
  setNewQuestion: function (state, payload) {
    state.questions.push(payload)
  },
  setOneQuestion (state, payload) {
    console.log(payload.userId.username, 'setquestion, dfoisoifoi')
    state.question = payload
  },
  setAnswers (state, payload) {
    state.answers = payload
  },
  setNewAnswer: function (state, payload) {
    state.answers.push(payload)
  },
  pushNewUpdateAns: function (state, payload) {
    state.answers.forEach((element, index) => {
      if (element._id === payload._id) {
        state.answers.splice(index, 1, payload)
      }
    })
  },
  deletAns: function (state, payload) {
    let index = state.answers.findIndex(x => {
      return x._id === payload._id
    })
    state.answers.splice(index, 1)
  },
  deleteQuest: function (state, payload) {
    let index = state.questions.findIndex(x => {
      return x._id === payload._id
    })
    state.questions.splice(index, 1)
  }
}

export default mutations
