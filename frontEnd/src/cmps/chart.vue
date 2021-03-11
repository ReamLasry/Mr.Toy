<script>
import { Doughnut } from "vue-chartjs";
export default {
  props: ["toys"],
  extends: Doughnut,
  computed: {
    funnyStyle() {
      let len = 0;
      this.toys.forEach((toy) => {
        if (toy.type === "funny") len++;
      });
      return len;
    },
    educationalStyle() {
      let len = 0;
      this.toys.forEach((toy) => {
        if (toy.type === "educational") len++;
      });
      return len;
    },
    adultStyle() {
      let len = 0;
      this.toys.forEach((toy) => {
        if (toy.type === "adult") len++;
      });
      return len;
    },
  },
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ["funny", "educational", "adult"],
      datasets: [
        {
          label: "GitHub Commits",
          backgroundColor: "#f87979",
          data: [this.funnyStyle, this.educationalStyle, this.adultStyle],
        },
      ],
    });
  },
  created() {
    console.log("Dashbored was created with toys: ", this.toys);
  },
};
</script>