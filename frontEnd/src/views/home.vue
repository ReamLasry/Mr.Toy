<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <hello-world msg="Welcome "/>
  
  </div>
</template>

<script>
// @ is an alias to /src
import helloWorld from '@/cmps/helloWorld.vue'

export default {
  name: 'Home',
  components: {
    helloWorld
  }
}
</script>
