<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";

import AmenityCard from "./AmenityCard.vue";

const amenitiesRef = ref([]);
const disabled = ref(true);
const tower = localStorage.getItem("tower");
const getAmenities = async () => {
  const amenities = await fetch(`${import.meta.env.VITE_HOST}/api/amenity/tower/${tower}`);
  const amenitiesJson = await amenities.json();
  if (amenitiesJson.amenities) {
    amenitiesRef.value = amenitiesJson.amenities;
  }
};

onMounted(() => {
  getAmenities();
});
</script>

<template>
  <ul class="grid">
    <AmenityCard
      v-for="amenity in amenitiesRef"
      :key="amenity['_id']"
      :amenity="amenity"
    />
  </ul>
</template>

<style scoped>
ul {
  padding: 0;
}

.grid {
  display: grid;
  list-style: none;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 30px;
  margin-top: 1rem;
}
</style>
