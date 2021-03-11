<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ count }}</h2>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return 23 + " Jays on my feet";
    },
  },
};
</script>

