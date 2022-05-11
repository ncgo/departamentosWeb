<script setup lang="ts">
  import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/profile"
      ><i class="fa-solid fa-face-smile"></i
    ></RouterLink>
    <img src="../../assets/logo-uchi-blanco.png" alt="" style="height: 5vh" />
    <RouterLink to="/messages"><i class="fa-solid fa-comment"></i></RouterLink>
  </header>
</template>

<script lang="ts">
  export default {
    name: 'Header',
    data() {
      return {}
    },
    components: {},
  }
</script>

<style scoped>
  header {
    display: flex;
    -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
    box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
    padding: 0 1.5rem;
    height: 8vh;
    background-color: #7b2cbf;
    align-items: center;
    justify-content: space-between;
    z-index: 99;
  }

  a {
    text-decoration: none;
    color: #f9f4f5;
    font-size: 1.1rem;
  }

  a.router-link-active {
    text-decoration: underline;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
