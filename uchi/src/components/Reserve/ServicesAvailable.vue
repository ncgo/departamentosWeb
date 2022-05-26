<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import ServiciosCardAvailable from "./ServiciosCardAvailable.vue";

const props = defineProps<{
  type: string;
}>();

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

var tower;
const disabled = ref(true);
const called = ref(false);

// get value from route
const route = useRoute();
// const amenityID = "628e9a875a8918056e80c81e";
var amenityID;

if (route.params.id) {
  amenityID = route.params.id;
} else {
  tower = localStorage.getItem("tower");
}

const getAmenity = async () => {
  if (tower) {
    const amenity = await fetch(
      `${import.meta.env.VITE_HOST}/api/amenity/type/${tower}/${props.type}`
    );
    const amenityJson = await amenity.json();
    console.log(amenityJson);
    if (amenityJson.amenity) {
      amenityRef.value = amenityJson.amenity;
      called.value = true;
    }
      console.log(amenityRef.value);
  } else {
    const amenity = await fetch(
      `${import.meta.env.VITE_HOST}/api/amenity/${amenityID}`
    );
    const amenityJson = await amenity.json();
      console.log(amenityJson);

    if (amenityJson.amenity) {
      amenityRef.value = amenityJson.amenity;
      called.value = true;
    }
  }
};

onMounted(() => {
  getAmenity();
});
</script>

<template >
<div v-if="amenityRef.name != ''">
  <h1>{{ amenityRef.name }}</h1>
  <p>{{ amenityRef.description }}</p>

  <h2>Servicios Disponibles</h2>
  <ul class="grid" >
    <ServiciosCardAvailable
      v-if="called"
      v-for="service in amenityRef.services"
      :key="service._id"
      :service="service"
      :type="service.type"
    />
  </ul>
  </div>
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
