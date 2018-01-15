const mutations = {
  saveUser: function (state, payload) {
    localStorage.setItem('emailHacktiv', payload.email)
    localStorage.setItem('usernameHacktiv', payload.username)
    localStorage.setItem('uidHacktiv', payload._id)
    alert('succes login')
  }
}

export default mutations
