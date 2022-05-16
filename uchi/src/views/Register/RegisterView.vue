<script setup lang="ts">
import { ref, useAttrs } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import router from "../../router";

import User from "../../components/Register/User.vue";
import { faTentArrowDownToLine } from "@fortawesome/free-solid-svg-icons";


function tenant(){
    router.push('/register/tenant');
}
function apartment(){
    router.push('/register/apartment');
}
function tower(){
    router.push('/register/tower');
}
function admin(){
    router.push('/register/admin');
}

</script>

<template>
  <main>
    <div class="grid">
      <button @click="tenant">Tenant</button>
      <button @click="admin">Administrator</button>
      <button @click="apartment">Apartment</button>
      <button @click="tower">Tower</button>
    </div>
  </main>
</template>

<style scoped>

 main {
   display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      160deg,
      rgb(123, 44, 191) 0%,
      rgb(110, 57, 157) 35%,
      rgb(58, 41, 97) 100%
    );
  }

.grid {
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-gap: 3rem;
}

button {
    padding: 0.7rem 4rem;
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
    transition: all 0.2s ease-in-out;
    background-color: rgb(191, 141, 235);
    outline: none;
  }

</style>
