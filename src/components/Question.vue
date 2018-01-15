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
                  </th>
                </thead>
                <tbody>
                    <tr>
                      <td>Dislike</td>
                      <td>Like</td>
                      <td>12</td>
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

  </div>
</template>

<script>
import Answers from '@/components/Answers'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Question',
  components: { Answers },
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'question'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestionById',
      'getAnswersBasedOnQue'
    ])
  },
  created () {
    let params = this.$route.params.id
    this.getQuestionById(params)
    this.getAnswersBasedOnQue(params)
  }
}
</script>

<style scoped>

h1 {
  font-size: 2em;
}

#section1 {
  margin-top: 20px;
}
</style>
