<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import Amenities from "../../components/Reserve/Amenities.vue";

import router from "../../router";

function amenity() {
  router.push("/register/amenity");
}
const isAdmin = localStorage.getItem("role");
const showModal = ref(false);

const amenityRef = ref({
  name: "",
  description: "",
  tower: "",
  type: "",
});

const api = `${import.meta.env.VITE_HOST}/api/amenity`;

function show() {
  showModal.value = !showModal.value;
}

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
      showModal.value = false;
      window.location.reload();
}
</script>

<template>
  <main>
    <div class="header">
      <h1>Amenities</h1>
      <div class="right">
        <button @click="show" v-if="isAdmin == 'admin'" >Add Amenity</button>

        <form @submit="register" v-if="showModal">
          <div class="grid">
            <div class="grid_item">
              <label for="name">Name</label>
              <input type="text" id="name" v-model="amenityRef.name" required />
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
              <input
                type="text"
                id="tower"
                v-model="amenityRef.tower"
                required
              />
            </div>

            <!-- Type  -->
            <div class="grid_item">
              <label for="type">Type</label>
              <select id="type" v-model="amenityRef.type" required>
                <option value="" disabled>Select type</option>
                <option value="alberca">Alberca</option>
                <option value="lavanderia">Lavanderia</option>
                <option value="sala">Sala</option>
                <option value="cine">Sala de video</option>
              </select>
            </div>

            <div class="grid_item">
              <button type="submit">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <Amenities />
  </main>
</template>

<style scoped>
main {
  padding: 1.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background: #fff;
  border: 1px solid #000;
  border-radius: 0.5rem;
  background-color: #7b2cbf;
  color: #fff;
  padding: 0.8rem;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 5vw;
}

form {
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(1,1fr);
}

form .grid{
  display: grid;
  grid-template-columns: repeat(2,1fr);
}
form .grid input[type="text"]{
  border-radius: .5rem;
  border : 1px solid #000;
  padding: .5rem;
}

form label{
  display: block;
}

form button{
  margin-top: 1rem;
}
</style>
