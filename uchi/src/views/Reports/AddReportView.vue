<script setup lang="ts">
  import { ref, useAttrs } from '@vue/runtime-core'
  import { useRoute } from 'vue-router'
  import { onMounted } from 'vue'
  import router from '../../router'
  const user = ref('')
  const subject = ref('')
  const description = ref('')
  const tower = ref('')
  const apartment = ref('')

  const api = import.meta.env.VITE_HOST + '/api/report'

  const userID = localStorage.getItem('userID')
  const userTower = localStorage.getItem('tower')
  const userApt = localStorage.getItem('apartment')

  async function addReport() {
    const Report = {
      user: userID,
      description: description.value,
      subject: subject.value,
      tower: userTower,
      apartment: userApt,
      status: 'Created',
      resolved: false,
    }

    await fetch(`${api}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Report),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.ok)
        if (json.ok) {
          router.push('/reports')
        } else {
          alert(json.message)
        }
      })
  }
</script>

<template>
  <main>
    <router-link to="/reports" class="button" id="back"
      ><i class="fa-solid fa-arrow-left"></i> Go Back</router-link
    >
    <div class="card">
      <h1>New Report</h1>
      <form @submit.prevent="addReport">
        <div class="formGroup">
          <label for="subject">Subject</label>
          <input
            type="text"
            id="subject"
            v-model="subject"
            placeholder="Brief description of your problem"
          />
        </div>
        <div class="formGroup">
          <label for="description">Description</label>
          <textarea
            name="description"
            type="text"
            id="description"
            v-model="description"
            cols="30"
            rows="5"
            placeholder="Detailed description of your problem"
          ></textarea>
        </div>
        <button type="submit" class="button" id="submit">
          Guardar Reporte
        </button>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
  export default {
    name: 'Add Report',
    data() {
      return {}
    },
    components: {},
    methods: {
      toReport() {
        this.$router.push('/reports/report')
      },
    },
  }
</script>

<style scoped>
  main {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .button {
    background: rgb(123, 44, 191);
    background: linear-gradient(
      297deg,
      rgba(123, 44, 191, 1) 43%,
      rgba(157, 78, 221, 1) 84%
    );
    border-radius: 10px;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border: 0;
    font-weight: bold;
  }

  #submit {
    padding: 1rem 1rem;
  }

  #back {
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
  }
  .card {
    background-color: #f9f4f5;
    padding: 1.5rem;
    border-radius: 25px;
    -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
    box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
    width: 50%;
  }

  form {
    text-align: center;
  }

  label {
    display: block;
    font-size: 1.2rem;
  }

  input,
  textarea {
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
  input:focus,
  textarea:active,
  textarea:focus {
    outline: none;
  }

  textarea::placeholder {
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
</style>
