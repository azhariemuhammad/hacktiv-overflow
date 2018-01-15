<template>
  <div id="app">
    <TheNavbar />
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
export default {
  name: 'app',
  components: { TheNavbar }
}
</script>

<style>
body {
  margin: 0;
}

#app {

}


</style>
