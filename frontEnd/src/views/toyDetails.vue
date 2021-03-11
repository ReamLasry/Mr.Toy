<template>
  <div v-if="currToyDetails">
    <h1>{{ currToyDetails.name }}</h1>
    <h2>Price: ${{ currToyDetails.price }}</h2>
    <h2>Type: {{ type }}</h2>
    <h2>In stock {{ isStock }}</h2>
    <h2>Creation Date: {{ createdAt }}</h2>

    <router-link :to="'/toys'">
      <button>Back</button>
    </router-link>
    <router-link :to="'/toy/edit/' + currToyDetails._id">
      <button>Edit</button>
    </router-link>
  </div>
</template>



<script>
import { toyService } from "../services/toy.service.js";

export default {
  props: ["toy"],
  data() {
    return {
      currToyDetails: null,
    };
  },
  computed: {
    toyID() {
      return this.$route.params.toyId;
    },
    isStock() {
      if (this.currToyDetails.inStock) return "✅";
      if (!this.currToyDetails.inStock) return "❌";
    },
    createdAt() {
      const fullDate = new Date(this.currToyDetails.createdAt);
      const day = fullDate.getDay() + 7;
      const month = fullDate.getMonth() + 1;
      const year = fullDate.getFullYear();
      const date = day + "/" + month + "/" + year;
      return date;
    },
    type() {
      return (
        this.currToyDetails.type.charAt(0).toUpperCase() +
        this.currToyDetails.type.substring(1)
      );
    },
  },
  created() {
    const id = this.toyID;
    toyService.getById(id).then((toy) => (this.currToyDetails = toy));
  },
};
</script>