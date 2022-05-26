<script setup lang="ts">
defineProps<{
  amenity : {
    name : string,
    description : string,
    type: string,
    _id : string,
  };
}>();
</script>

<template>
  <RouterLink :to="'/reserve/' + amenity._id" style="text-decoration: none">
    <li class="wrapper">
      <img  v-if="amenity.type == 'lavanderia'" src="https://hispanosemprendedores.com/wp-content/uploads/2021/02/laundry-machines-J9AM5SS.jpg"/>
      <img  v-if="amenity.type == 'alberca'" src="https://www.momalia.com/wp-content/uploads/2019/09/area-de-piscina-hotel2.jpg"/>
      <img  v-if="amenity.type == 'sala'" src="https://www.ciudaris.com/blog/wp-content/uploads/ciudaris-areas-comunes-de-un-edificio.jpg"/>
      <img  v-if="amenity.type == 'cine'" src="https://d2prydcqrq5962.cloudfront.net/image/journal/article?img_id=362654&t=1581428941743"/>
      <h3>{{ amenity.name }}</h3>
      <p>{{ amenity.description }}</p>
    </li>
  </RouterLink>
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

p {
  color: white;
  left: 1rem;
  bottom: 1rem;
  z-index: 9;
  text-decoration: none;
}
</style>
