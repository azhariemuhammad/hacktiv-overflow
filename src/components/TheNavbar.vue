<template>
  <div>
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <router-link :to="{path: '/'}"><a class="navbar-item">
          <h1>Hacktiv-OverFlow</h1>
        </a></router-link>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu">

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
              </p>
              <div v-if="isLogin">
                <p class="control">
                  <a class="button is-primary" @click="login">
                    <span class="icon">
                      <i class="material-icons">account_circle</i>
                    </span>
                    <span>Login</span>
                  </a>
                </p>
              </div>
              <div v-else>
                <a class="button is-primary" @click="logOut">
                    <span class="icon">
                      <i class="material-icons">account_circle</i>
                    </span>
                    <span>Logout</span>
                  </a>
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Modal -->
      <div>
      <card-modal :visible="isVisible" :title="title" transition="zoom">
        <div class="content has-text-centered">
          <a class="button is-danger is-outlined" @click="auth">Google</a>
        </div>
      </card-modal>
    </div>


  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { Modal, ImageModal, CardModal } from 'vue-bulma-modal'

export default {
  name: 'TheNavbar',
  components: {
    Modal,
    ImageModal,
    CardModal
  },
  data () {
    return {
      isVisible: false,
      title: 'Login',
      isLogin: false
    }
  },
  computed: {
    ...mapState([
      'username'
    ])
  },
  methods: {
    ...mapActions([
      'googleAuth',
      'googleSignOut'
    ]),
    logOut: function () {
      this.isLogin = !this.isLogin
      this.googleSignOut()
      this.$router.push('/')
    },
    login: function () {
      this.isVisible = !this.isVisible
    },
    auth: function () {
      this.isLogin = !this.isLogin
      this.googleAuth()
      this.isVisible = false
    },
    cekLogin: function () {
      let uid = localStorage.getItem('uidHacktiv')
      if (uid) {
        this.isLogin = true
      }
    }
  },
  created () {
    this.cekLogin()
  }

}
</script>

<style>

</style>
