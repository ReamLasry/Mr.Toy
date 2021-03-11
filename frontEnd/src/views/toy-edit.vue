<template>
  <section v-if="toyToEdit">
    <form @submit.prevent="save">
      <label>Name:</label>
      &nbsp;
      <input type="text" placeholder="Toy name" v-model="toyToEdit.name" />
      <br />
      <label>Price:</label>
      &nbsp;
      <input type="number" placeholder="Toy price" v-model="toyToEdit.price" min="0" />
      <br />
      <label>Type:</label>
      &nbsp;
      <select v-model="toyToEdit.type">
        <option value="educational">Educational</option>
        <option value="adult">Adult</option>
        <option value="funny">Funny</option>
      </select>
      <!-- <input type="text" placeholder="tpye"/> -->
      <br />
      <input type="checkbox" name="vehicle1" @input="stockToggle" v-model="toyToEdit.inStock"/>
      <label> In stock</label>
      <br />
      <button>Save</button>
    </form>
  </section>
</template>

<script>
import { toyService } from "../services/toy.service.js";

export default {
  data() {
    return {
      toyToEdit: null,
    };
  },
  methods: {
    save() {
      const toy = JSON.parse(JSON.stringify(this.toyToEdit));
      this.$store.dispatch({ type: "updateToys", toy });
      this.$router.push("/toys");
    },
    stockToggle() {
      const toy = this.toyToEdit;
      this.$store.dispatch({ type: "toyStockToogle", toy });
    },
  },
  computed: {
    toyID() {
      return this.$route.params.toyId;
    },
    isChecked() {
      return "checked";
    },
  },
  created() {
    if (this.toyID) {
      const id = this.toyID;
      toyService.getById(id).then((toy) => {
        (this.toyToEdit = toy)
        console.log(this.toyToEdit);
        });
    } else this.toyToEdit = toyService.getEmptyToy();
  },
};
</script>