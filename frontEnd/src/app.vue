<template>
  <div class="container">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/toys">Toys</router-link> |
      <router-link to="/dashboard">Dashbored</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <hr />
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch({ type: "loadProducts" });
  }
};
</script>
