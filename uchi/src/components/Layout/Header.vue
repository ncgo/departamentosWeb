<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/reserve">Reserve</RouterLink>
  </header>
</template>

<style scoped>
header {
  display: flex;
  -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
  box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
  padding: 0 1.5rem;
  height: 3.6rem;
  background-color: #e4355c;
  align-items: center;
}

a {
  text-decoration: none;
  color: white;
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

a:hover {
  text-decoration: underline;
}
</style>
