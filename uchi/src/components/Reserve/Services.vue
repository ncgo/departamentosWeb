<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import ServiciosCard from "./ServiciosCard.vue";
import ServiciosCardAvailable from "./ServiciosCardAvailable.vue";

const amenityRef = ref({
  name: "",
  description: "",
  services: [
    {
      _id: "",
      name: "",
      type: "",
    },
  ],
});
const disabled = ref(true);

const getAmenity = async () => {
  const route = useRoute();
  const id = route.params.id;

  const amenity = await fetch(`${import.meta.env.VITE_HOST}/api/amenity/${id}`);
  const amenityJson = await amenity.json();

  if (amenityJson.amenity) {
    amenityRef.value = amenityJson.amenity;
  }
};

onMounted(() => {
  getAmenity();
});
</script>

<template>
  <h1>{{ amenityRef.name }}</h1>
  <p>{{ amenityRef.description }}</p>

  <h2>Servicios</h2>
  <ul class="grid">
    <ServiciosCard
      v-for="service in amenityRef.services"
      :key="service._id"
      :service="service"
      :type="service.type"
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
