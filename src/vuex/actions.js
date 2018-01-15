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
  }
}

export default actions
