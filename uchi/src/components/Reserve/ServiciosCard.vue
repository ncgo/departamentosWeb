<script setup lang="ts">
import { ref } from "vue";

import SelectTime from "./SelectTime.vue";

defineProps<{
  service: {
    _id: string;
    name: string;
    type: string;
  };
}>();

const showTime = ref(false);

const toggleShowTime = () => {
  showTime.value = !showTime.value;
};
</script>

<template>
  <li class="wrapper">
    <img  v-if="service.type == 'lavanderia'" src="https://www.lg.com/cac/images/lavadoras-y-secadoras/md06205436/gallery/D-02.jpg"/>
      <img  v-if="service.type == 'alberca'" src="https://www.digdesarrollos.com/wp-content/uploads/2019/11/Departamentos-con-alberca-1200x445.jpg"/>
      <img  v-if="service.type == 'sala'" src="https://constructivo.com/imgPosts/1536855564lCEPSQuq.jpg"/>
      <img  v-if="service.type == 'cine'" src="https://www.multimedia.com.mx/wp-content/uploads/2020/10/salas_cine_0313_620x250.jpg"/>
    <h3>{{ service.name.charAt(0).toUpperCase() + service.name.slice(1) }}</h3>
    <button @click="toggleShowTime">Reservar</button>
    <SelectTime v-if="showTime" :showTime="toggleShowTime" :id="service._id" />
  </li>
</template>

<style scoped>
.wrapper {
  height: 19rem;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  border-radius: 0.3rem;
  overflow: hidden;
}

.wrapper:after {
  content: "";
  position: absolute;
  inset: 0px;
  pointer-events: none;
  border-radius: 8px;
  transform: translateZ(0px);
  transition: opacity 300ms ease 0s;
  background: rgba(0, 0, 0, 0)
    linear-gradient(
      transparent 62%,
      rgba(0, 0, 0, 0.004) 63.94%,
      rgba(0, 0, 0, 0.016) 65.89%,
      rgba(0, 0, 0, 0.03) 67.83%,
      rgba(0, 0, 0, 0.06) 69.78%,
      rgba(0, 0, 0, 0.094) 71.72%,
      rgba(0, 0, 0, 0.133) 73.67%,
      rgba(0, 0, 0, 0.176) 75.61%,
      rgba(0, 0, 0, 0.224) 77.56%,
      rgba(0, 0, 0, 0.267) 79.5%,
      rgba(0, 0, 0, 0.306) 81.44%,
      rgba(0, 0, 0, 0.34) 83.39%,
      rgba(0, 0, 0, 0.37) 85.33%,
      rgba(0, 0, 0, 0.384) 87.28%,
      rgba(0, 0, 0, 0.396) 89.22%,
      rgba(0, 0, 0, 0.4) 91.17%
    )
    repeat scroll 0% 0%;
  opacity: 1;
}

img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h3 {
  color: white;
  left: 1rem;
  bottom: 0.7rem;
  font-size: 1.3rem;
  z-index: 9;
  text-decoration: none;
}

button {
  width: 7rem;
  background-color: #7b2cbf;
  border: 0;
  border-radius: 0.4rem;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  height: 2rem;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 9;
}

button:hover {
  cursor: pointer;
}
</style>
