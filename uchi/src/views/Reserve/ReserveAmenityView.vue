<script setup lang="ts">
  import Services from '../../components/Reserve/Services.vue'
  import ServicesAvailable from '../../components/Reserve/ServicesAvailable.vue'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  const isAdmin = localStorage.getItem('role')
  const showModal = ref(false)
  const route = useRoute()
  const amenityID = route.params.id
  const name = ref('')
  const type = ''
  const api = `${import.meta.env.VITE_HOST}/api/amenity/add/${amenityID}`

  function register(e) {
    //post to api
    e.preventDefault()

    fetch(api, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        type: type,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          alert('Amenities registered')
        } else {
          alert('Tower not found')
        }
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    showModal.value = false
    name.value = ''

    //refresh ServicesAvailable
    // Services.reload();
    // ServicesAvailable.reload();
    // Services.onMounted();
    window.location.reload()
  }

  function show() {
    showModal.value = true
  }
</script>

<template>
  <main>
    <div class="header">
      <div class=""></div>
      <button @click="show" v-if="isAdmin == 'admin'">Add Amenity</button>
    </div>

    <div class="amenity" v-if="showModal">
      <div class=""></div>
      <form @submit="register">
        <div class="name">
          <label style="display: block">Name</label>
          <input type="text" name="name" v-model="name" required />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>

    <Services />
    <ServicesAvailable />
  </main>
</template>

<style scoped>
  main {
    padding: 1.5rem;
  }
  .header {
    margin-bottom: 1rem;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .amenity {
    margin-right: 3vw;
    position: absolute;
    top: 10vh;
    right: 1.5rem;
    z-index: 1;
  }

  .amenity label {
    margin-bottom: 0.1rem;
  }

  .amenity input {
    margin-bottom: 1rem;
  }

  button {
    background: #fff;
    border: 1px solid #000;
    border-radius: 0.5rem;
    background-color: #7b2cbf;
    color: #fff;
    padding: 0.8rem;
    font-size: 1rem;
    cursor: pointer;
    margin-right: 5vw;
  }
</style>
