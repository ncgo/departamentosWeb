<script setup lang="ts">
  import { ref, useAttrs } from '@vue/runtime-core'
  import { useRoute } from 'vue-router'
  import router from '../../router'
  const route = useRoute()
  const role = localStorage.getItem('role')
  const statusR = ref('')
  const id = route.params.id
  const api = import.meta.env.VITE_HOST + '/api/report'
  const report = ref({
    _id: '',
    subject: '',
    description: '',
    status: '',
    updatedAt: '',
    createdAt: '',
    user: '',
    apartment: '',
  })

  const status = ['Received', 'Pending', 'In Progress', 'Resolved']

  const getReport = async () => {
    const res = await fetch(`${api}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Allow-Origin': '*',
      },
    }).then((res) => res.json())
    report.value = res.report

    if(report.value.status == "Created"){
      report.value.status = "Received"
    }
      console.log(report.value.status)

  }

  const updateStatus = async () => {
    if (report['status'] == 'Created') {
      report['status'] = 'Received'
    }

    console.log(report.value.status)

    fetch(`${api}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: report.value.status,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          alert('Report status updated')
          router.push('/reports')
          router.push('/reports')
        } else {
          alert('Tower not found')
        }
      })
  }

  getReport()
  // updateStatus()
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
          <tr v-if="role == 'admin'">
            <th>Created by:</th>
            <td>{{ report.user }}</td>
          </tr>
          <tr v-if="role == 'admin'">
            <th>Apartment:</th>
            <td>{{ report.apartment }}</td>
          </tr>
          <tr v-if="role == 'user'">
            <th>Status:</th>
            <td>{{ report.status }}</td>
          </tr>

          <tr v-if="role == 'admin'">
            <th>Status:</th>
            <td>
              <select name="status" id="status" v-model="report.status">
                <!-- const status = ['Received', 'Pending', 'In Progress', 'Resolved'] -->
                <option >Received</option>
                <option >Pending</option>
                <option >In Progress</option>
                <option >Resolved</option>
              </select>
            </td>
          </tr>
          <tr v-if="role == 'admin'">
            <td><button @click="updateStatus">Save</button></td>
          </tr>
        </table>
      </div>
      <p class="text-muted">Updated on: {{ report.updatedAt }}</p>
    </div>
  </main>
</template>

<!-- <script lang="ts">
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
</script> -->

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
