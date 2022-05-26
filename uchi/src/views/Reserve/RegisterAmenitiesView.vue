<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import router from "../../router";

const amenityRef = ref({
  name: "",
  description: "",
  tower: "",
  type: "",
});

const api = `${import.meta.env.VITE_HOST}/api/amenity`;
const showModal = ref(false);


function register(e) {
    //post to api
    e.preventDefault();

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: amenityRef.value.name,
        description: amenityRef.value.description,
        tower: amenityRef.value.tower,
        type: amenityRef.value.type,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          // alert("Amenities registered");
          router.push("/reserve");
        } else {
          alert("Tower not found");
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
}
</script>

<template>
  <main>
    <h1>New Amenities</h1>

    <form @submit="register">
      <div class="grid">
        <div class="grid_item">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="amenityRef.name" required/>
        </div>

        <div class="grid_item">
          <label for="description">Description</label>
          <input
            type="text"
            id="description"
            v-model="amenityRef.description"
            required
          />
        </div>

        <div class="grid_item">
          <label for="tower">Tower</label>
          <input type="text" id="tower" v-model="amenityRef.tower" required/>
        </div>

        <!-- Type  -->
        <div class="grid_item">
          <label for="type">Type</label>
          <select id="type" v-model="amenityRef.type" required >
            <option value="" disabled>Select type</option>
            <option value="alberca">Alberca</option>
            <option value="lavanderia">Lavanderia</option>
            <option value="sala">Sala</option>
          </select>
        </div>


        <div class="grid_item">
          <button type="submit">Register</button>
        </div>
      </div>
    </form>
  </main>
</template>

<style scoped>
main {
  padding: 1.5rem;
}
</style>
