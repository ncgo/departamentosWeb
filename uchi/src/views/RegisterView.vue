<script setup lang="ts">
  import { ref, useAttrs } from '@vue/runtime-core'
  import { useRoute } from 'vue-router'
  import { onMounted } from 'vue'
  import router from '../router'

  const email = ref('')
  const tower = ref('')
  const apt = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const phone = ref('')

  const api = 'https://protected-wildwood-95234.herokuapp.com' + '/api/user'

  async function register() {
    //login
    const User = {
      email: email.value,
      tower: tower.value,
      apartment: apt.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
    }

    await fetch(`${api}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(User),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.ok)
        if (json.ok) {
          router.push('/')
        } else {
          alert(json.message)
        }
      })
  }
</script>

<template>
  <main>
    <div class="container">
      <h1>New Tenant</h1>
      <form>
        <div class="userName">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            v-model="email"
            placeholder="your@mail.com"
          />
        </div>
        <div class="firstName">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="firstName"
            placeholder="First Name"
          />
        </div>
        <div class="lastName">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            placeholder="Last Name"
          />
        </div>
        <div class="tower">
          <label for="tower">Tower</label>
          <input type="text" id="tower" v-model="tower" placeholder="Tower" />
        </div>
        <div class="apt">
          <label for="apt">Apartment</label>
          <input type="text" id="apt" v-model="apt" placeholder="Apt" />
        </div>
        <div class="phone">
          <label for="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            v-model="phone"
            placeholder="Your Phone"
          />
        </div>
        <!-- <button type="submit">Login</button> -->
        <!-- button click  -->
        <div class="login">
          <label for="apt">ㅤ</label>
          <button type="button" @click="register">Register</button>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
  main {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: linear-gradient(
      160deg,
      rgb(123, 44, 191) 0%,
      rgb(110, 57, 157) 35%,
      rgb(58, 41, 97) 100%
    );
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 2rem;
    color: #fff;
    margin-top: 5rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  form {
    min-width: 50vw;
    text-align: center;
    padding-bottom: 2rem;
  }

  @media (min-width: 768px) {
    .container {
      margin-top: 0;
    }
    form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1rem;
      grid-auto-flow: row;
    }
  }

  label {
    display: block;
    font-size: 1.2rem;
  }

  input {
    padding: 1rem 1rem;
    width: 100%;
    max-width: 15rem;
    background-color: rgba(255, 254, 254, 0.586);
    border: none;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    color: rgb(62, 57, 57);
  }

  input:active,
  input:focus {
    outline: none;
  }

  button {
    padding: 0.7rem 6rem;
    max-height: 3rem;
    border: none;
    border-radius: 0.6rem;
    background-color: rgb(147, 105, 184);
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
  }

  button:hover {
    cursor: pointer;
    background-color: rgb(191, 141, 235);
  }
</style>
