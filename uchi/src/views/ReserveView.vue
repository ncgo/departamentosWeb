<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";

import Amenities from "../components/Reserve/Amenities.vue";
</script>

<template>
  <main>
    <h1>Amenities</h1>
    <Amenities />
  </main>
</template>

<style scoped>
main {
  padding: 1.5rem;
}
</style>
