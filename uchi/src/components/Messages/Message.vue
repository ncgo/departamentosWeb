<script setup lang="ts">
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const id = route.params.id
  const api = 'https://protected-wildwood-95234.herokuapp.com' + '/api/message'
  console.log(id)

  const message = ref({
    adminName: '',
    date: '',
    subject: '',
    message: '',
  })

  const getMessage = async () => {
    const res = await fetch(`${api}/message/${id}`, {
      method: 'GET',
      headers: {
        'Allow-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
    message.value = res.message
    //refresh page
  }

  getMessage()
</script>

<template>
  <section>
    <div class="msgHeader">
      <img
        src="../../assets/logo-uchi-encima-morado.png"
        alt=""
        class="imgSender"
      />
      <h2 class="sender">{{ message.adminName }}</h2>
      <p class="date">{{ message.date }}</p>
    </div>

    <div class="content">
      <h1>{{ message.subject }}</h1>
      <p class="msgSubject">{{ message.message }}</p>
    </div>
  </section>
</template>

<script lang="ts">
  import { ref } from '@vue/runtime-dom'

  export default {
    name: 'Profile',
    data() {
      return {}
    },
    components: {},
  }
</script>
<style scoped>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 1);
    box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 1);
    border-radius: 15px;
  }

  .msgHeader {
    padding: 1.5rem;
    background: rgb(123, 44, 191);
    background: linear-gradient(
      297deg,
      rgba(123, 44, 191, 1) 43%,
      rgba(157, 78, 221, 1) 84%
    );
    width: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    color: white;
  }

  h1 {
    text-align: center;
    font-weight: bold;
  }

  h2 {
    text-align: center;
    font-weight: bold;
  }

  .imgSender {
    height: 20%;
    width: 20%;
    align-self: center;
    z-index: 10;
  }

  table {
    margin: 1vh 0;
    margin-left: auto;
    margin-right: auto;
  }

  .role {
    color: #777;
  }

  .content {
    padding: 1.5rem;
  }
</style>
