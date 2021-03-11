<template>
  <ul>
    <li v-for="toy in toys" :key="toy._id">
      <toy-prev :toy="toy" />
      <router-link :to="'/toy/details/' + toy._id">
        <button>ℹ️</button>
      </router-link>
      <button @click="remove(toy._id)">X</button>
    </li>
  </ul>
</template>

<script>
import toyPrev from "@/cmps/toyPrev.vue";

export default {
  props: ["toys"],
  methods: {
    remove(id) {
      this.$store.dispatch({ type: "removeToy", id });
    },
  },
  components: {
    toyPrev,
  },
};
</script>