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
        This container is <strong>centered</strong> on desktop.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>

.hero-body {
  background-image: url('../assets/code.jpeg');
  background-repeat: no-repeat,no-repeat;
  background-size: cover;
  height: 500px;
}

.title {
  color: #ffffff;
}
</style>
