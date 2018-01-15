<template>
  <div>
    <table class="table">
      <h2>7 Answers</h2>
        <thead>
          <th></th>
          <th></th>
        </thead>
        <tbody>
            <tr v-for="item in answers">
              <td><a class="button is-success is-outlined">
                <i class="material-icons">mood</i></a></td>
              <td>
                <a class="button is-danger is-outlined"><i class="material-icons">sentiment_very_dissatisfied</i></a>
              </td>
              <td></td>
              <td>
                  <h4>{{ item.userId.username }}: </h4>
                  <a class="button is-danger is-outlined" v-if="canEditAnswer" @click="edit(item)">Edit</a>
                      <a class="button is-danger is-outlined" v-if="canEditAnswer" @click="">Remove</a>
                  <p> <span v-html="item.answer"></span></p>
              </td>
            </tr>
        </tbody>
          <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <vue-editor v-model="answer"></vue-editor>
              <div class="submit-question">
                  <input type="submit" @click="submitAnswer" class="button">
                </div>
            </th>
          </tr>
        </tfoot>
      </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { VueEditor } from 'vue2-editor'
export default {
  components: { VueEditor },
  name: 'Answers',
  data () {
    return {
      answer: '',
      userId: localStorage.getItem('uidHacktiv'),
      canEditAnswer: false
    }
  },
  computed: {
    ...mapState([
      'answers'
    ])
  },
  methods: {
    ...mapActions([
      'postAnswer'
    ]),
    submitAnswer: function () {
      let obj = {
        answer: this.answer,
        queId: this.$route.params.id
      }
      this.postAnswer(obj)
      this.answer = ''
    },
    edit: function (params) {
      this.answer = params.answer
    },
    answerEdit: function (params) {
      let uid = this.userId
      console.log(uid)
      console.log(params)
      if (params.userId._id === uid) {
        this.canEditAnswer = !this.canEditAnswer
      }
    }
  },
  created () {
    this.answerEdit()
  }
}
</script>

<style scoped>

.submit-question {
  margin-top: 10px;
}

</style>
