<template>
  <div>
    <div class="columns is-mobile">
      <div class="column is-one-fifth">
        
      </div>
      <div class="column is-three-quarters is-mobile">
            <h1> {{ question.title }} </h1>
              <h4>{{ question.userId.username }}</h4>      
              <p>{{ question.createdAt }}</p>
        
        <div class="columns  is-mobile" id="section1">
          
          <div class="column is-four-fifths is-mobile">
               <table class="table">
                <thead>
                  <th>votes</th>
                  <th>view</th>
                  <th class="question">
                  </th>
                  <th>
                    <a class="button is-danger is-outlined">Ask Question</a>
                      <a class="button is-danger is-outlined" v-if="canEdit" @click="showModal">Edit</a>
                      <a class="button is-danger is-outlined" v-if="canEdit" @click="remove">Remove</a>
                  </th>
                </thead>
                <tbody>
                    <tr>
                      <td>
                        <a class="button is-success is-outlined">
                          <i class="material-icons">mood</i></a>
                      </td>
                      <td>
                        <a class="button is-danger is-outlined"><i class="material-icons">sentiment_very_dissatisfied</i></a>
                      </td>
                      <td></td>
                      <td>
                        <p> <span v-html="question.question"></span></p>
                      </td>
                      
                    </tr>
                </tbody>
                 <tfoot>
                </tfoot>
              </table>

              <Answers />
              
          </div>    
          <div class="column">
          </div>
        </div>
    
      </div>
      <div class="column">

      </div>
    </div>

    <div>
       <card-modal :visible="isVisibleUpdate" :title="title" transition="zoom">
        <div class="content">
          <div class="field">
            <label class="label">Your Question</label>
            <div class="control">
              <form action="" @submit.prevent="submitForm">
                <div class="field">
                  <label class="label">Title</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Text input" v-model="question.title">
                  </div>
                </div>
                <vue-editor v-model="question.question" id="update"></vue-editor>
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
import Answers from '@/components/Answers'
import { VueEditor } from 'vue2-editor'
import { Modal, CardModal } from 'vue-bulma-modal'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Question',
  components: { Answers, Modal, CardModal, VueEditor },
  data () {
    return {
      Qtitle: '',
      userId: localStorage.getItem('uidHacktiv'),
      isVisibleUpdate: false,
      title: 'Edit Your Question'
    }
  },
  computed: {
    ...mapState([
      'question'
    ]),
    canEdit: function () {
      let uid = this.userId
      console.log(uid)
      console.log(this.question.userId._id)
      if (this.question.userId._id === uid) {
        return true
      }
    }
  },
  methods: {
    ...mapActions([
      'getQuestionById',
      'getAnswersBasedOnQue',
      'update',
      'removeQuestion'
    ]),
    showModal: function () {
      this.isVisibleUpdate = !this.isVisibleUpdate
    },
    submitForm: function () {
      let obj = {
        question: this.question.question,
        title: this.question.title,
        userId: this.userId,
        id: this.$route.params.id
      }
      this.update(obj)
      this.isVisibleUpdate = !this.isVisibleUpdate
    },
    remove: function () {
      this.removeQuestion(this.question._id)
      this.$router.push('/')
    }
  },
  created () {
    let params = this.$route.params.id
    this.getQuestionById(params)
    this.getAnswersBasedOnQue(params)
  }
}
</script>

<style scoped>
.submit-question {
  margin-top: 10px;
}

h1 {
  font-size: 2em;
}

#section1 {
  margin-top: 20px;
}
</style>
