<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";

import ServiciosCardAvailable from "./ServiciosCardAvailable.vue";

const amenityRef = ref({
  name: "",
  description: "",
  services: [
    {
      _id: "",
      name: "",
    },
  ],
});
const disabled = ref(true);
const called = ref(false);

const getAmenity = async () => {
  const amenity = await fetch(
    `${import.meta.env.VITE_HOST}/api/amenity/627accb82f048d9d2aba2db0`
  );
  const amenityJson = await amenity.json();

  if (amenityJson.amenity) {
    amenityRef.value = amenityJson.amenity;
    called.value = true;
  }
};

onMounted(() => {
  getAmenity();
});
</script>

<template>
  <h1>{{ amenityRef.name }}</h1>
  <p>{{ amenityRef.description }}</p>

  <h2>Servicios Disponibles</h2>
  <ul class="grid">
    <ServiciosCardAvailable
      v-if="called"
      v-for="service in amenityRef.services"
      :key="service._id"
      :service="service"
    />
  </ul>
</template>

<style scoped>
h2 {
  margin-top: 2rem;
}
.grid {
  display: grid;
  list-style: none;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 30px;
  margin-top: 1rem;
  padding: 0;
}
</style>
