<script setup lang="ts">
  import { ref, useAttrs } from '@vue/runtime-core'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const id = route.params.id
  const api = import.meta.env.VITE_HOST + '/api/report'
  const report = ref({
    _id: '',
    subject: '',
    description: '',
    status: '',
    updatedAt: '',
    createdAt: '',
  })

  const getReport = async () => {
    const res = await fetch(`${api}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Allow-Origin': '*',
      },
    }).then((res) => res.json())
    report.value = res.report
    console.log(res)
    console.log(report.value)
  }

  getReport()
</script>

<template>
  <main>
    <router-link to="/reports" id="goBack"
      ><i class="fa-solid fa-arrow-left"></i
    ></router-link>
    <div class="card">
      <h1>Report #{{ report._id.substring(17) }}</h1>
      <h2>{{ report.subject }}</h2>
      <p>{{ report.description }}</p>
      <div class="details">
        <table>
          <tr>
            <th>Date created:</th>
            <td>{{ report.createdAt }}</td>
          </tr>
          <!-- <tr>
          <th>Created by:</th>
          <td>[AUTHOR]</td>
        </tr>
        <tr>
          <th>Tower:</th>
          <td>[TOWER]</td>
        </tr>
        <tr>
          <th>Apartment:</th>
          <td>[Apt]</td>
        </tr> -->
          <tr>
            <th>Status:</th>
            <td>{{ report.status }}</td>
          </tr>
        </table>
      </div>
      <p class="text-muted">Updated on: {{ report.updatedAt }}</p>
    </div>
  </main>
</template>

<script lang="ts">
  import router from '../../router'
  export default {
    name: 'Reports',
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
  }
  #goBack {
    background: rgb(123, 44, 191);
    background: linear-gradient(
      297deg,
      rgba(123, 44, 191, 1) 43%,
      rgba(157, 78, 221, 1) 84%
    );
    border-radius: 10px;
    color: white;
    padding: 0.5rem 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border: 0;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
  .card {
    background-color: #f9f4f5;
    padding: 1.5rem;
    border-radius: 25px;
    -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
    box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
    width: 50%;
  }
  .details {
    width: 100%;
    display: flex;
    justify-content: end;
  }
  table {
    margin-top: 1.5rem;
    text-align: end;
  }
  th {
    color: #7b2cbf;
    font-weight: bold;
    text-align: left;
  }

  .text-muted {
    text-align: right;
    font-size: small;
    color: gray;
  }
</style>
