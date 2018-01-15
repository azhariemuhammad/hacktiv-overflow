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
              <td>Like</td>
              <td>
                dislike
              </td>
              <td></td>
              <td>
                  <h4>{{ item.userId.username }}: </h4>
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
      answer: ''
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
    }
  }

}
</script>

<style scoped>

.submit-question {
  margin-top: 10px;
}

</style>
