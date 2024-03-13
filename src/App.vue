<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <workCenter></workCenter>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import workCenter from "./components/workCenter/index.vue"

export default {
  name: 'App',
  components: {
    // HelloWorld,
    workCenter
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100% ;
}
#app{
  width: 100%;
  height: 100% ;
}

</style>
