<template>
  <div class="toy-app">
      
    <input type="text" />
    <router-link to="/toy/edit/"><button>+New toy</button></router-link>
    <toy-list :toys="toys" />
  </div>
</template>

<script>
import toyList from "@/cmps/toyList.vue";
export default {
  computed: {
    toys() {
      return this.$store.getters.toys;
    },
  },
  components: {
    toyList,
  },
};
</script>
