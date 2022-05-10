<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";

import AmenityCard from "../components/Reserve/AmenityCard.vue";

const amenitiesRef = ref([]);
const disabled = ref(true);

const getAmenities = async () => {
  const amenities = await fetch(`${import.meta.env.VITE_HOST}/api/amenity`);
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
  <main>
    <h1>Amenities</h1>
    <ul class="grid">
      <AmenityCard
        v-for="amenity in amenitiesRef"
        :key="amenity._id"
        :amenity="amenity"
      />
    </ul>
  </main>
</template>

<style scoped>
main {
  padding: 1.5rem;
}

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
