<script setup lang="ts">
import { ref, useAttrs } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import router from "../../router";

const name = ref("");
const tower = ref("");

const api = import.meta.env.VITE_HOST + "/api/apartment";

async function register() {
  //login
  const Aparment = {
    name: name.value,
    tower: tower.value,
  };

  await fetch(`${api}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Aparment),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json.ok);
      if (json.ok) {
        router.push("/");
      } else {
        alert(json.message);
      }
    });
}
</script>

<template>
  <main>
    <div class="container">
      <h1>New Apartment</h1>
      <form>
        <div class="userName">
          <label for="name">Apartment #</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Apartment #"
          />
        </div>
        <div class="tower">
          <label for="firstName">Tower</label>
          <input
            type="text"
            id="tower"
            v-model="tower"
            placeholder="Tower"
          />
        </div>
        <!-- <button type="submit">Login</button> -->
        <!-- button click  -->
        <div class="login">
          <label for="apt">ㅤ</label>
          <button type="button" @click="register">Save</button>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  /* overflow: scroll; */
  background: linear-gradient(
    160deg,
    rgb(123, 44, 191) 0%,
    rgb(110, 57, 157) 35%,
    rgb(58, 41, 97) 100%
  );
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;
  color: #fff;
  margin-top: 5rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

form {
  min-width: 50vw;
  text-align: center;
  padding-bottom: 2rem;
}

@media (min-width: 768px) {
  .container {
    margin-top: 0;
  }
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    grid-auto-flow: row;
  }
}

label {
  display: block;
  font-size: 1.2rem;
}

input {
  padding: 1rem 1rem;
  width: 100%;
  max-width: 15rem;
  background-color: rgba(255, 254, 254, 0.586);
  border: none;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  color: rgb(62, 57, 57);
}

input:active,
input:focus {
  outline: none;
}

button {
  padding: 0.7rem 6rem;
  max-height: 3rem;
  border: none;
  border-radius: 0.6rem;
  background-color: rgb(147, 105, 184);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
}

button:hover {
  cursor: pointer;
  background-color: rgb(191, 141, 235);
}
</style>
