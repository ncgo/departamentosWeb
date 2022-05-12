<script setup lang="ts"></script>

<template>
  <main>
    <h1>Reports</h1>
    <router-link to="/reports/add" id="addReport">Make a report</router-link>
    <table>
      <tr>
        <th>Report #ID</th>
        <th>Date Created</th>
        <th>Report Description</th>
        <th>Status</th>
      </tr>
      <tr @click="toReport" class="tableRow">
        <td>#[XXXXX]</td>
        <td>[DATE]</td>
        <td>[Lorem ipsum dolor et amel]</td>
        <td>[STATUS]</td>
      </tr>
    </table>
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
  #addReport {
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
  table {
    background-color: #f9f4f5;
    padding: 1.5rem;
    border-radius: 25px;
    -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
    box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
    width: 50%;
  }

  th {
    border-bottom: #7b2cbf solid;
    border-collapse: collapse;
    color: #7b2cbf;
    font-weight: bold;
  }
  .tableRow {
    text-align: center;
  }
  .tableRow:hover {
    background-color: #c8b8db;
    color: white;
  }
</style>
