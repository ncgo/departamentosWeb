<script setup lang="ts">
import { ref, useAttrs } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const email = ref("");
const password = ref("");

// const api = import.meta.env.VITE_HOST;
// get .env variable host

// const api = "http://localhost:3001/api/login";
// const api = "https://protected-wildwood-95234.herokuapp.com/api/login";
const api = import.meta.env.VITE_HOST + "/api/login";

async function login() {
  //login
  const User = {
    email: email.value,
    password: password.value,
  };

  await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(User),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      console.log(json.ok);
      if (json.ok) {
        localStorage.setItem("token", json.token);
        localStorage.setItem("userID", json.user.id);
        localStorage.setItem("userFName", json.user.firstName);
        localStorage.setItem("userLName", json.user.lastName);
        localStorage.setItem("role", json.user.role);
        window.location.href = "/";
      } else {
        alert(json.message);
      }
    });
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Login</h1>
      <form action="">
        <div class="userName">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            v-model="email"
            placeholder="your@mail.com"
          />
        </div>
        <div class="password">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Your password"
          />
        </div>
        <!-- <button type="submit">Login</button> -->
        <!-- button click  -->
        <button type="button" @click="login">Login</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
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
}

h1{
    font-size: 2rem;
    margin-bottom: 1rem;
}

form {
  min-width: 50vw;
  text-align: center;
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

button{
    padding: .7rem 6rem;
    border:none;
    border-radius: .6rem;
    background-color: rgb(147, 105, 184);
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
}

button:hover{
    cursor: pointer;
    background-color: rgb(191, 141, 235);
}

</style>
