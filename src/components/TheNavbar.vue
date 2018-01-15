<template>
  <div>
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <h1>Hacktiv-OverFlow</h1>
        </a>
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
                <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms">
                  <span class="icon">
                    <i class="fab fa-twitter"></i>
                  </span>
                  <span>
                    Tweet
                  </span>
                </a>
              </p>
              <p class="control">
                <a class="button is-primary" @click="login">
                  <span class="icon">
                    <i class="fas fa-download"></i>
                  </span>
                  <span>Login</span>
                </a>
              </p>
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
import { mapActions } from 'vuex'
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
      title: 'Login'
    }
  },
  methods: {
    ...mapActions([
      'googleAuth'
    ]),
    login: function () {
      this.isVisible = !this.isVisible
    },
    auth: function () {
      this.googleAuth()
      this.isVisible = false
    }
  }
}
</script>

<style>

</style>
