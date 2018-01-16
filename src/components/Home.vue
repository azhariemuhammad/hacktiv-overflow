<template>
  <div>

    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
               <h1 class="title">
                Learn, Share and Build
              </h1>
              <h2 class="subtitle">
                
              </h2>
            </div>
            <div class="column">
              Sign Up Today
            </div>
          </div>


        </div>
      </div>
    </section>


    <div class="container">
      <div class="notification">
        <table class="table">
          <thead>
            <th>votes</th>
            <th></th>
            <th></th>
            <th class="question"></th>
            <th>
              <a class="button is-danger is-outlined" @click="showModal">Ask Question</a>
            </th>
          </thead>
           <tbody>
              <tr v-for="item in questions">
                <td>{{ item.like.length }}</td>
                <td></td>
                <td></td>
                <td>
                  <router-link :to="{ path: `question/${item._id}`}"> {{ item.title }} </router-link>
                  <br>
                  <p>Post By: {{ item.userId.username }} || {{ item.createdAt }}</p>
                </td>
              </tr>
           </tbody>
        </table>
      </div>
    </div>
        
        <!-- Modal -->
      <div>
      <card-modal :visible="isVisible" :title="title" transition="zoom">
        <div class="content">
          <div class="field">
            <label class="label">Your Question</label>
            <div class="control">
              <form action="" @submit.prevent="submitForm">
                <div class="field">
                  <label class="label">Title</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Text input" v-model="Qtitle">
                  </div>
                </div>
                <vue-editor v-model="question"></vue-editor>
                <div class="submit-question">
                  <input type="submit" class="button">
                </div>
              </form>              
            </div>
          </div>
        </div>
      </card-modal>
    </div>

  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { Modal, CardModal } from 'vue-bulma-modal'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    Modal,
    CardModal,
    VueEditor
  },
  data () {
    return {
      question: '',
      Qtitle: '',
      isVisible: false,
      title: 'Ask Question'
    }
  },
  computed: {
    ...mapState([
      'questions'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestions',
      'postQuestion'
    ]),
    showModal: function () {
      if (localStorage.getItem('usernameHacktiv')) {
        this.isVisible = !this.isVisible
      } else {
        alert('Please Login')
      }
    },
    submitForm: function () {
      let obj = {
        question: this.question,
        title: this.Qtitle,
        userId: localStorage.getItem('uidHacktiv')
      }
      this.postQuestion(obj)
      this.isVisible = !this.isVisible
    }
  },
  created () {
    this.getQuestions()
  }

}
</script>

<style scoped>

footer.modal-card-foot {
  display: none !important;
}
.hero-body {
  background-image: url('../assets/code.jpeg');
  background-repeat: no-repeat,no-repeat;
  background-size: cover;
  height: 500px;
}
.submit-question {
  margin-top: 10px;
}

.title {
  color: #ffffff;
}

.question {
  width: 100%;
}
</style>
