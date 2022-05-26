<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  const role = localStorage.getItem('role');
</script>

<template>
  <footer>
    <RouterLink v-if="role==='admin'" to="/register">Register</RouterLink>
    <RouterLink to="/reserve">Reserve</RouterLink>
    <RouterLink to="/" class="tab">
      <i class="fa-solid fa-house"></i
    ></RouterLink>
      <RouterLink v-if="role==='admin'" to="/users">Users</RouterLink>
      <RouterLink v-if="role==='admin'" to="/towers">Towers</RouterLink>
    <RouterLink to="/reports">Report</RouterLink>
  </footer>
</template>

<script lang="ts">
  export default {
    name: 'Tabs',
    data() {
      return {}
    },
    components: {},
  }
</script>

<style scoped>
  footer {
    display: flex;
    padding: 0 1.5rem;
    height: 10vh;
    -webkit-box-shadow: 0px -5px 15px -9px rgba(0, 0, 0, 0.27);
    box-shadow: 0px -5px 15px -9px rgba(0, 0, 0, 0.27);
    background-color: #7b2cbf;
    align-items: center;
    justify-content: center;
  }

  a {
    text-decoration: none;
    color: #9d4edd;
    margin: 0 3vw;
    font-size: 1.1rem;
    display: flex;
    flex-direction: column;
    padding: 0.1rem;
  }

  a.router-link-active {
    font-weight: bold;
    color: white;
  }

  a:hover {
    font-weight: bold;
    color: white;
  }
</style>
