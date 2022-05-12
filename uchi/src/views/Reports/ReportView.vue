<script setup lang="ts"></script>

<template>
  <main>
    <router-link to="/reports" id="goBack"
      ><i class="fa-solid fa-arrow-left"></i
    ></router-link>
    <div class="card">
      <h1>Report [ID]</h1>
      <table>
        <tr>
          <th>Date created:</th>
          <td>[DATE]</td>
        </tr>
        <tr>
          <th>Description:</th>
          <td>[Lorem ipsum dolor et amel]</td>
        </tr>
        <tr>
          <th>Notes:</th>
          <td>[Lorem ipsum dolor et amel]</td>
        </tr>
        <tr>
          <th>Status:</th>
          <td>[STATUS]</td>
        </tr>
      </table>
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
    margin-bottom: 1.5rem;
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

  th {
    color: #7b2cbf;
    font-weight: bold;
    text-align: left;
  }
</style>
