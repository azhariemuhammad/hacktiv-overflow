<template>
  <div>
    <table class="table">
      <h2>{{ answers.length }} Answers</h2>
        <thead>
          <th></th>
          <th></th>
        </thead>
        <tbody>
            <tr v-for="item in answers">
              <td><a class="button is-success is-outlined badge" :data-badge="item.votes.length" @click="like(item)">
                <i class="material-icons">mood</i></a></td>
              <td>
              </td>
              <td></td>
              <td>
                  <span><h4>{{ item.userId.username }}: {{ item.createdAt }} </h4></span>
                  <a class="button is-danger is-outlined" v-if="item.userId._id === userId" @click="edit(item)">Edit</a>
                      <a class="button is-danger is-outlined" v-if="item.userId._id === userId" @click="removeAns(item._id)">Remove</a>
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
      isEdit: false,
      answerId: ''
    }
  },
  computed: {
    ...mapState([
      'answers'
    ])
  },
  methods: {
    ...mapActions([
      'postAnswer',
      'updateAnswer',
      'removeAns',
      'likeAns',
      'unLike'
    ]),
    submitAnswer: function () {
      console.log('helo')
      if (this.isEdit === false) {
        let obj = {
          answer: this.answer,
          queId: this.$route.params.id
        }
        this.answer = ''
        this.postAnswer(obj)
      } else {
        console.log('update')
        this.updateAns()
        this.isEdit = false
        this.answer = ''
      }
    },
    edit: function (params) {
      this.answer = params.answer
      this.isEdit = true
      this.answerId = params._id
    },
    updateAns: function () {
      let obj = {
        answer: this.answer,
        id: this.answerId,
        queId: this.$route.params.id,
        userId: this.userId
      }
      this.updateAnswer(obj)
    },
    like: function (item) {
      console.log(item)
      let obj = {
        id: item._id,
        userId: this.userId
      }
      let index = item.votes.findIndex(x => {
        return x._id === this.userId
      })
      console.log(index)
      if (index === -1) {
        this.likeAns(obj)
      } else {
        this.unLike(obj)
      }
    }
  },
  created () {}
}
</script>

<style scoped>

.submit-question {
  margin-top: 10px;
}

</style>
