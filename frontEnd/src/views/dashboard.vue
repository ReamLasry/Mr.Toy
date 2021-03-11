<template>
  <section>
    <chart class="chart" :toys="toys" />
  </section>
</template>

<script>
import chart from "@/cmps/chart.vue";
export default {
  computed:{
    toys(){
      return this.$store.getters.toys;
    }
  },
  components: {
    chart,
  },
};
</script>

<style>
.chart {
  width: 50%;
}
</style>