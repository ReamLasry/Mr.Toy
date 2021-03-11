<template>
  <section>
    <h1>{{ toy.name }}</h1>
    <h2>Price:  ${{ toy.price }}</h2>
    <h2>In stock {{ isStock }}</h2>
  </section>
</template>

<script>
export default {
  props: ["toy"],
  computed: {
    isStock() {
      if (this.toy.inStock) return "✅";
      if (!this.toy.inStock) return "❌";
    },
  },
};
</script>